import React, { useState } from 'react';

const SolverResults = ({ results, isMax }) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!results) return null;

  const { optimalZ, variables, slacks, status, message, steps, continuousZ, continuousVars } = results;

  return (
    <div
      style={{
        marginTop: '2rem',
        borderTop: '1.5px dashed #4ade80',
        paddingTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ fontSize: '1.2rem', margin: 0, letterSpacing: '0.15em', color: '#4ade80' }}>
          ANALYSIS RESULTS
        </h3>
        <span
          style={{
            fontSize: '0.85rem',
            padding: '4px 12px',
            borderRadius: '9999px',
            border: '1px solid #4ade80',
            backgroundColor: 'rgba(74, 222, 128, 0.15)',
            color: '#4ade80'
          }}
        >
          {status}
        </span>
      </div>

      {message && (
        <div style={{ color: '#f87171', fontSize: '0.9rem' }}>
          {message}
        </div>
      )}

      {optimalZ !== undefined && (
        <div
          style={{
            background: 'rgba(20, 83, 45, 0.3)',
            border: '1px solid #4ade80',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '15px'
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block' }}>OPTIMAL VALUE ({isMax ? 'MAX' : 'MIN'} Z)</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4ade80' }}>
              {optimalZ}
            </span>
            {continuousZ !== undefined && (
              <span style={{ fontSize: '0.75rem', display: 'block', opacity: 0.6 }}>
                (Relaxed LP: {continuousZ})
              </span>
            )}
          </div>

          {variables && Object.entries(variables).map(([name, val]) => (
            <div key={name}>
              <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block' }}>VARIABLE {name}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4ade80' }}>
                {val}
              </span>
            </div>
          ))}

          {slacks && Object.keys(slacks).length > 0 && (
            <div>
              <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block' }}>SLACK VARIABLES</span>
              <div style={{ fontSize: '0.9rem', color: 'rgba(74, 222, 128, 0.85)' }}>
                {Object.entries(slacks).map(([s, val]) => (
                  <span key={s} style={{ marginRight: '10px' }}>{s} = {val}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step-by-Step Simplex Tableau Explorer */}
      {steps && steps.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em' }}>
              SIMPLEX TABLEAU ({activeStep + 1} of {steps.length})
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="counter-btn"
                style={{ width: 'auto', padding: '0 10px', opacity: activeStep === 0 ? 0.3 : 1 }}
              >
                &larr; PREV
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className="counter-btn"
                style={{ width: 'auto', padding: '0 10px', opacity: activeStep === steps.length - 1 ? 0.3 : 1 }}
              >
                NEXT &rarr;
              </button>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'rgba(74, 222, 128, 0.8)', margin: '0 0 10px 0' }}>
            {steps[activeStep].description}
          </p>

          <div style={{ overflowX: 'auto', border: '1px solid rgba(74, 222, 128, 0.4)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#143521', borderBottom: '1px solid #4ade80' }}>
                  <th style={{ padding: '8px', borderRight: '1px solid rgba(74, 222, 128, 0.3)' }}>Basis</th>
                  {steps[activeStep].colHeaders.map((col, idx) => (
                    <th key={idx} style={{ padding: '8px', borderRight: idx === steps[activeStep].colHeaders.length - 1 ? 'none' : '1px solid rgba(74, 222, 128, 0.2)' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {steps[activeStep].tableau.map((row, rIdx) => {
                  const isZRow = rIdx === steps[activeStep].tableau.length - 1;
                  return (
                    <tr
                      key={rIdx}
                      style={{
                        background: isZRow ? 'rgba(74, 222, 128, 0.1)' : 'transparent',
                        borderBottom: isZRow ? 'none' : '1px solid rgba(74, 222, 128, 0.2)',
                        fontWeight: isZRow ? 'bold' : 'normal'
                      }}
                    >
                      <td style={{ padding: '8px', borderRight: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ade80' }}>
                        {steps[activeStep].basicVars[rIdx] || (isZRow ? 'Z' : '')}
                      </td>
                      {row.map((val, cIdx) => (
                        <td
                          key={cIdx}
                          style={{
                            padding: '8px',
                            borderRight: cIdx === row.length - 1 ? 'none' : '1px solid rgba(74, 222, 128, 0.15)',
                            color: isZRow ? '#4ade80' : 'rgba(255, 255, 255, 0.9)'
                          }}
                        >
                          {Number(val.toFixed(2))}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolverResults;
