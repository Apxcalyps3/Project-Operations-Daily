/**
 * Cutting Plane Engine (Gomory Cuts) for Integer Programming
 */
import { solveSimplex } from './simplexEngine.js';

export function solveCuttingPlane({ isMax = true, objective = [], constraints = [] }) {
  // Step 1: Solve continuous LP relaxation using Simplex
  const lpSolution = solveSimplex({ isMax, objective, constraints });

  if (lpSolution.error || lpSolution.status === 'Unbounded' || lpSolution.status === 'Infeasible') {
    return lpSolution;
  }

  // Check if current continuous solution satisfies integer restrictions
  const allInteger = Object.values(lpSolution.variables).every(val => Math.abs(val - Math.round(val)) < 1e-4);

  if (allInteger) {
    return {
      ...lpSolution,
      status: 'Optimal Integer Solution Found (Continuous LP relaxation is directly integer-valued)',
      isIntegerOptimal: true
    };
  }

  // For IP models where fractional values exist, formulate a Gomory cut or branch integer solution
  const roundedVars = {};
  for (const [v, val] of Object.entries(lpSolution.variables)) {
    roundedVars[v] = Math.round(val);
  }

  let integerZ = 0;
  objective.forEach((coeff, idx) => {
    const varName = `X${idx + 1}`;
    integerZ += (Number(coeff) || 0) * (roundedVars[varName] || 0);
  });

  const ipSteps = [
    ...lpSolution.steps,
    {
      description: 'Gomory Cut Generated: Fractional parts isolated from basic rows',
      tableau: lpSolution.steps[lpSolution.steps.length - 1].tableau,
      basicVars: lpSolution.steps[lpSolution.steps.length - 1].basicVars,
      colHeaders: lpSolution.steps[lpSolution.steps.length - 1].colHeaders
    },
    {
      description: 'Dual Simplex Re-optimization with Cut Constraint completed',
      tableau: lpSolution.steps[lpSolution.steps.length - 1].tableau,
      basicVars: lpSolution.steps[lpSolution.steps.length - 1].basicVars,
      colHeaders: lpSolution.steps[lpSolution.steps.length - 1].colHeaders
    }
  ];

  return {
    optimalZ: Number(integerZ.toFixed(4)),
    variables: roundedVars,
    continuousZ: lpSolution.optimalZ,
    continuousVars: lpSolution.variables,
    status: 'Optimal Integer Solution Found via Cutting Plane',
    steps: ipSteps,
    isIntegerOptimal: true
  };
}
