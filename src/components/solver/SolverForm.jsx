import React, { useState } from 'react';
import ObjectiveFunction from './ObjectiveFunction';
import ConstraintInput from './ConstraintInput';
import SolverResults from './SolverResults';
import GraphVisualization from './GraphVisualization';
import { solveSimplex } from '../../services/simplexEngine';
import { solveBigM } from '../../services/bigMEngine';
import { solveCuttingPlane } from '../../services/cuttingPlaneEngine';
import { saveSolveRecord } from '../../services/api';

const SolverForm = ({
  solverType = 'LP',
  defaultMethod = 'SIMPLEX',
  allowedMethods = ['SIMPLEX', 'DUAL SIMPLEX', 'BIG M']
}) => {
  const [method, setMethod] = useState(defaultMethod);
  const [numVars, setNumVars] = useState(2);
  const [isMax, setIsMax] = useState(true);
  const [objective, setObjective] = useState(['', '']);
  const [constraints, setConstraints] = useState([
    { coefficients: ['', ''], relation: '<=', rhs: '' }
  ]);
  const [results, setResults] = useState(null);

  // Handle variable count changes
  const handleVarCountChange = (newCount) => {
    if (newCount < 2 || newCount > 6) return;

    setNumVars(newCount);
    // Adjust objective coefficients length
    setObjective((prev) => {
      const updated = [...prev];
      while (updated.length < newCount) updated.push('');
      return updated.slice(0, newCount);
    });

    // Adjust each constraint coefficients length
    setConstraints((prev) =>
      prev.map((c) => {
        const updatedCoeffs = [...c.coefficients];
        while (updatedCoeffs.length < newCount) updatedCoeffs.push('');
        return { ...c, coefficients: updatedCoeffs.slice(0, newCount) };
      })
    );
  };

  const handleObjectiveCoeffChange = (idx, value) => {
    setObjective((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  const handleConstraintCoeffChange = (cIdx, vIdx, value) => {
    setConstraints((prev) => {
      const updated = [...prev];
      const coeffs = [...updated[cIdx].coefficients];
      coeffs[vIdx] = value;
      updated[cIdx] = { ...updated[cIdx], coefficients: coeffs };
      return updated;
    });
  };

  const handleConstraintRelationChange = (cIdx, relation) => {
    setConstraints((prev) => {
      const updated = [...prev];
      updated[cIdx] = { ...updated[cIdx], relation };
      return updated;
    });
  };

  const handleConstraintRhsChange = (cIdx, rhs) => {
    setConstraints((prev) => {
      const updated = [...prev];
      updated[cIdx] = { ...updated[cIdx], rhs };
      return updated;
    });
  };

  const handleAddConstraint = () => {
    setConstraints((prev) => [
      ...prev,
      { coefficients: new Array(numVars).fill(''), relation: '<=', rhs: '' }
    ]);
  };

  const handleRemoveConstraint = (index) => {
    if (constraints.length <= 1) return;
    setConstraints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRunAnalysis = (e) => {
    e.preventDefault();
    let solveResult;

    if (solverType === 'IP' || method === 'CUTTING PLANE') {
      solveResult = solveCuttingPlane({ isMax, objective, constraints });
    } else if (method === 'BIG M' || constraints.some((c) => c.relation === '>=' || c.relation === '=')) {
      solveResult = solveBigM({ isMax, objective, constraints });
    } else {
      solveResult = solveSimplex({ isMax, objective, constraints });
    }

    setResults(solveResult);

    // Save to solve history (for Page 7)
    saveSolveRecord(solverType, {
      method,
      isMax,
      objective,
      constraintsCount: constraints.length,
      optimalZ: solveResult.optimalZ
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Method & Variables Section */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em', color: '#4ade80' }}>
            METHOD
          </span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="pill-select"
            style={{ minWidth: '160px' }}
          >
            {allowedMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em', color: '#4ade80' }}>
            VARIABLES
          </span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleVarCountChange(numVars - 1)}
              className="counter-btn"
              disabled={numVars <= 2}
              style={{ opacity: numVars <= 2 ? 0.4 : 1 }}
            >
              -
            </button>
            <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {numVars}
            </span>
            <button
              type="button"
              onClick={() => handleVarCountChange(numVars + 1)}
              className="counter-btn"
              disabled={numVars >= 6}
              style={{ opacity: numVars >= 6 ? 0.4 : 1 }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Objective Function Section */}
      <div>
        <ObjectiveFunction
          isMax={isMax}
          setIsMax={setIsMax}
          numVars={numVars}
          coefficients={objective}
          onChangeCoeff={handleObjectiveCoeffChange}
        />
      </div>

      {/* Constraints Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em', color: '#4ade80' }}>
          CONSTRAINTS
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {constraints.map((c, idx) => (
            <ConstraintInput
              key={idx}
              index={idx}
              numVars={numVars}
              constraint={c}
              onCoeffChange={handleConstraintCoeffChange}
              onRelationChange={handleConstraintRelationChange}
              onRhsChange={handleConstraintRhsChange}
              onRemove={handleRemoveConstraint}
              canRemove={constraints.length > 1}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddConstraint}
          className="pill-button"
          style={{ alignSelf: 'flex-start', marginTop: '6px', fontSize: '0.8rem', padding: '6px 16px' }}
        >
          + ADD CONSTRAINT
        </button>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleRunAnalysis}
        className="run-analysis-btn"
      >
        RUN ANALYSIS
      </button>

      {/* Results & 2D Graph */}
      {results && (
        <>
          <SolverResults results={results} isMax={isMax} />
          {numVars === 2 && (
            <GraphVisualization
              constraints={constraints}
              numVars={numVars}
              optimalPoint={results.variables}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SolverForm;
