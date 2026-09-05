/**
 * Simplex Engine for Linear Programming
 * Supports Standard Maximization and Minimization problems.
 */

export function solveSimplex({ isMax = true, objective = [], constraints = [] }) {
  const steps = [];
  const numVars = objective.length;
  const numConstraints = constraints.length;

  if (numVars === 0 || numConstraints === 0) {
    return { error: 'Please provide valid objective and constraints.' };
  }

  // Clone and ensure coefficients are numbers
  const c = objective.map(val => Number(val) || 0);
  const A = constraints.map(row => row.coefficients.map(val => Number(val) || 0));
  const b = constraints.map(row => Number(row.rhs) || 0);
  const rels = constraints.map(row => row.relation || '<=');

  // Check if any b < 0, multiply row by -1 and invert relation
  for (let i = 0; i < numConstraints; i++) {
    if (b[i] < 0) {
      b[i] = -b[i];
      for (let j = 0; j < numVars; j++) {
        A[i][j] = -A[i][j];
      }
      if (rels[i] === '<=') rels[i] = '>=';
      else if (rels[i] === '>=') rels[i] = '<=';
    }
  }

  // For pure standard simplex, assume '<=' constraints with non-negative RHS.
  // Add slack variables for each '<='
  const numSlack = numConstraints;
  const totalCols = numVars + numSlack + 1; // [vars, slacks, RHS]
  
  // Build initial tableau
  // Rows: constraints (0 .. numConstraints-1), plus Z-row (numConstraints)
  const tableau = [];
  const basicVars = [];

  for (let i = 0; i < numConstraints; i++) {
    const row = new Array(totalCols).fill(0);
    for (let j = 0; j < numVars; j++) {
      row[j] = A[i][j];
    }
    // Slack variable
    row[numVars + i] = 1;
    // RHS
    row[totalCols - 1] = b[i];
    tableau.push(row);
    basicVars.push(`S${i + 1}`);
  }

  // Objective row (Z-row):
  // For MAX: Z - c1*X1 - c2*X2 ... = 0 -> coefficients in row are -c[j]
  // For MIN: maximize (-Z) -> coefficients are +c[j]
  const zRow = new Array(totalCols).fill(0);
  for (let j = 0; j < numVars; j++) {
    zRow[j] = isMax ? -c[j] : c[j];
  }
  tableau.push(zRow);

  const colHeaders = [
    ...Array.from({ length: numVars }, (_, i) => `X${i + 1}`),
    ...Array.from({ length: numSlack }, (_, i) => `S${i + 1}`),
    'RHS'
  ];

  const cloneTableau = (tab) => tab.map(r => [...r]);

  steps.push({
    description: 'Initial Simplex Tableau',
    tableau: cloneTableau(tableau),
    basicVars: [...basicVars, 'Z'],
    colHeaders
  });

  const MAX_ITERATIONS = 40;
  let iteration = 0;

  while (iteration < MAX_ITERATIONS) {
    iteration++;
    const currentZRow = tableau[numConstraints];

    // Find entering variable (most negative indicator in objective row for MAX)
    let pivotCol = -1;
    let minIndicator = -1e-9;

    for (let j = 0; j < totalCols - 1; j++) {
      if (currentZRow[j] < minIndicator) {
        minIndicator = currentZRow[j];
        pivotCol = j;
      }
    }

    // If no negative indicator, current solution is optimal
    if (pivotCol === -1) {
      break;
    }

    // Minimum Ratio Test to find pivot row
    let pivotRow = -1;
    let minRatio = Infinity;

    for (let i = 0; i < numConstraints; i++) {
      const elem = tableau[i][pivotCol];
      const rhs = tableau[i][totalCols - 1];
      if (elem > 1e-9) {
        const ratio = rhs / elem;
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotRow = i;
        }
      }
    }

    if (pivotRow === -1) {
      return {
        status: 'Unbounded',
        message: 'The problem is unbounded. No valid pivot row found in ratio test.',
        steps
      };
    }

    // Pivot operation
    const pivotVal = tableau[pivotRow][pivotCol];
    basicVars[pivotRow] = colHeaders[pivotCol];

    // Normalize pivot row
    for (let j = 0; j < totalCols; j++) {
      tableau[pivotRow][j] /= pivotVal;
    }

    // Eliminate pivot column in all other rows
    for (let i = 0; i <= numConstraints; i++) {
      if (i !== pivotRow) {
        const factor = tableau[i][pivotCol];
        for (let j = 0; j < totalCols; j++) {
          tableau[i][j] -= factor * tableau[pivotRow][j];
        }
      }
    }

    steps.push({
      description: `Iteration ${iteration}: Pivot on Row ${pivotRow + 1}, Col ${colHeaders[pivotCol]}`,
      tableau: cloneTableau(tableau),
      basicVars: [...basicVars, 'Z'],
      colHeaders,
      pivot: { row: pivotRow, col: pivotCol }
    });
  }

  // Extract solution
  const solution = {
    optimalZ: isMax 
      ? Number(tableau[numConstraints][totalCols - 1].toFixed(4))
      : Number((-tableau[numConstraints][totalCols - 1]).toFixed(4)),
    variables: {},
    slacks: {},
    status: 'Optimal Solution Found',
    steps
  };

  for (let j = 0; j < numVars; j++) {
    const varName = `X${j + 1}`;
    const rowIdx = basicVars.findIndex(v => v === varName);
    solution.variables[varName] = rowIdx !== -1 
      ? Number(tableau[rowIdx][totalCols - 1].toFixed(4)) 
      : 0;
  }

  for (let i = 0; i < numSlack; i++) {
    const slackName = `S${i + 1}`;
    const rowIdx = basicVars.findIndex(v => v === slackName);
    solution.slacks[slackName] = rowIdx !== -1 
      ? Number(tableau[rowIdx][totalCols - 1].toFixed(4)) 
      : 0;
  }

  return solution;
}
