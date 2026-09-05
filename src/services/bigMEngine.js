/**
 * Big-M Simplex Engine for problems with >= and = constraints.
 */
import { solveSimplex } from './simplexEngine.js';

export function solveBigM({ isMax = true, objective = [], constraints = [] }) {
  // If all constraints are '<=', delegate directly to standard simplex
  const hasMixedConstraints = constraints.some(c => c.relation === '>=' || c.relation === '=');
  if (!hasMixedConstraints) {
    return solveSimplex({ isMax, objective, constraints });
  }

  const steps = [];
  const numVars = objective.length;
  const numConstraints = constraints.length;

  const c = objective.map(val => Number(val) || 0);
  const A = constraints.map(row => row.coefficients.map(val => Number(val) || 0));
  const b = constraints.map(row => Number(row.rhs) || 0);
  const rels = constraints.map(row => row.relation || '<=');

  // Big M value
  const M = 10000;

  // Track slack, surplus, and artificial variables
  const varCols = [];
  const colHeaders = [];

  for (let j = 0; j < numVars; j++) {
    colHeaders.push(`X${j + 1}`);
  }

  let slackIdx = 1;
  let surplusIdx = 1;
  let artificialIdx = 1;

  const rowVars = [];

  for (let i = 0; i < numConstraints; i++) {
    const rel = rels[i];
    if (rel === '<=') {
      const name = `S${slackIdx++}`;
      colHeaders.push(name);
      rowVars.push({ type: 'slack', name, col: colHeaders.length - 1, row: i });
    } else if (rel === '>=') {
      const surplusName = `E${surplusIdx++}`;
      colHeaders.push(surplusName);
      const artName = `A${artificialIdx++}`;
      colHeaders.push(artName);
      rowVars.push({ type: 'artificial', name: artName, col: colHeaders.length - 1, row: i, surplusCol: colHeaders.length - 2 });
    } else if (rel === '=') {
      const artName = `A${artificialIdx++}`;
      colHeaders.push(artName);
      rowVars.push({ type: 'artificial', name: artName, col: colHeaders.length - 1, row: i });
    }
  }

  colHeaders.push('RHS');
  const totalCols = colHeaders.length;

  // Build Tableau
  const tableau = [];
  const basicVars = [];

  for (let i = 0; i < numConstraints; i++) {
    const row = new Array(totalCols).fill(0);
    for (let j = 0; j < numVars; j++) {
      row[j] = A[i][j];
    }
    row[totalCols - 1] = b[i];

    const rv = rowVars.find(r => r.row === i);
    if (rv) {
      if (rv.type === 'slack') {
        row[rv.col] = 1;
        basicVars.push(rv.name);
      } else if (rv.type === 'artificial') {
        if (rv.surplusCol !== undefined) {
          row[rv.surplusCol] = -1;
        }
        row[rv.col] = 1;
        basicVars.push(rv.name);
      }
    }
    tableau.push(row);
  }

  // Z-row
  const zRow = new Array(totalCols).fill(0);
  for (let j = 0; j < numVars; j++) {
    zRow[j] = isMax ? -c[j] : c[j];
  }

  // Add M penalties for artificial variables
  for (const rv of rowVars) {
    if (rv.type === 'artificial') {
      const penalty = isMax ? M : -M;
      zRow[rv.col] = penalty;
      // In canonical form, eliminate artificial variable from Z-row: Z_row = Z_row - penalty * row[i]
      for (let j = 0; j < totalCols; j++) {
        zRow[j] -= penalty * tableau[rv.row][j];
      }
    }
  }
  tableau.push(zRow);

  const cloneTableau = (tab) => tab.map(r => [...r]);

  steps.push({
    description: 'Initial Big-M Tableau with Penalties',
    tableau: cloneTableau(tableau),
    basicVars: [...basicVars, 'Z'],
    colHeaders
  });

  // Simplex pivot iterations
  let iteration = 0;
  const MAX_ITER = 50;

  while (iteration < MAX_ITER) {
    iteration++;
    const currentZRow = tableau[numConstraints];

    let pivotCol = -1;
    let minIndicator = -1e-6;

    for (let j = 0; j < totalCols - 1; j++) {
      if (currentZRow[j] < minIndicator) {
        minIndicator = currentZRow[j];
        pivotCol = j;
      }
    }

    if (pivotCol === -1) break;

    let pivotRow = -1;
    let minRatio = Infinity;

    for (let i = 0; i < numConstraints; i++) {
      const elem = tableau[i][pivotCol];
      const rhs = tableau[i][totalCols - 1];
      if (elem > 1e-7) {
        const ratio = rhs / elem;
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotRow = i;
        }
      }
    }

    if (pivotRow === -1) {
      return { status: 'Unbounded', message: 'Model is unbounded.', steps };
    }

    const pivotVal = tableau[pivotRow][pivotCol];
    basicVars[pivotRow] = colHeaders[pivotCol];

    for (let j = 0; j < totalCols; j++) {
      tableau[pivotRow][j] /= pivotVal;
    }

    for (let i = 0; i <= numConstraints; i++) {
      if (i !== pivotRow) {
        const factor = tableau[i][pivotCol];
        for (let j = 0; j < totalCols; j++) {
          tableau[i][j] -= factor * tableau[pivotRow][j];
        }
      }
    }

    steps.push({
      description: `Big-M Iteration ${iteration}: Pivot on Row ${pivotRow + 1}, Col ${colHeaders[pivotCol]}`,
      tableau: cloneTableau(tableau),
      basicVars: [...basicVars, 'Z'],
      colHeaders,
      pivot: { row: pivotRow, col: pivotCol }
    });
  }

  // Check if any artificial variable remains basic with non-zero value -> Infeasible
  for (let i = 0; i < numConstraints; i++) {
    if (basicVars[i].startsWith('A') && Math.abs(tableau[i][totalCols - 1]) > 1e-4) {
      return {
        status: 'Infeasible',
        message: 'No feasible solution exists (Artificial variable remains in basis).',
        steps
      };
    }
  }

  const solution = {
    optimalZ: isMax
      ? Number(tableau[numConstraints][totalCols - 1].toFixed(4))
      : Number((-tableau[numConstraints][totalCols - 1]).toFixed(4)),
    variables: {},
    status: 'Optimal Solution Found',
    steps
  };

  for (let j = 0; j < numVars; j++) {
    const varName = `X${j + 1}`;
    const rowIdx = basicVars.findIndex(v => v === varName);
    solution.variables[varName] = rowIdx !== -1 ? Number(tableau[rowIdx][totalCols - 1].toFixed(4)) : 0;
  }

  return solution;
}
