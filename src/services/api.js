/**
 * Mock API & Storage Service for Operations Daily
 */

const HISTORY_KEY = 'operations_daily_solve_history';

export function getSolveHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      // Default initial records matching Page 7 of PDF
      const initial = [
        { id: 1, type: 'IP', timestamp: '09/05/2026 14:30', description: 'SOLVED IP PROBLEM 09/05/2026 14:30' },
        { id: 2, type: 'IP', timestamp: '09/04/2026 18:15', description: 'SOLVED IP PROBLEM 09/04/2026 18:15' },
        { id: 3, type: 'IP', timestamp: '09/03/2026 09:20', description: 'SOLVED IP PROBLEM 09/03/2026 09:20' },
        { id: 4, type: 'LP', timestamp: '09/02/2026 21:00', description: 'SOLVED LP PROBLEM 09/02/2026 21:00' },
        { id: 5, type: 'LP', timestamp: '09/01/2026 11:45', description: 'SOLVED LP PROBLEM 09/01/2026 11:45' },
        { id: 6, type: 'LP', timestamp: '08/31/2026 16:10', description: 'SOLVED LP PROBLEM 08/31/2026 16:10' },
      ];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveSolveRecord(type = 'LP', details = {}) {
  try {
    const history = getSolveHistory();
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    
    const record = {
      id: Date.now(),
      type: type.toUpperCase(),
      timestamp: dateStr,
      description: `SOLVED ${type.toUpperCase()} PROBLEM ${dateStr}`,
      details
    };
    
    const updated = [record, ...history].slice(0, 30);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return record;
  } catch (e) {
    console.error(e);
  }
}

// Page 9 Daily LP Problem
export const DAILY_LP_MODEL = {
  title: 'DAILY LP MODEL',
  objective: 'MAXIMIZE Z = 5X₁ + 4X₂',
  rawObjective: [5, 4],
  isMax: true,
  constraints: [
    { text: '5X₁ + 26X₂ ≤ 5', coefficients: [5, 26], relation: '<=', rhs: 5 },
    { text: '8X₁ + 7X₂ ≤ 4', coefficients: [8, 7], relation: '<=', rhs: 4 },
  ],
  nonNegativity: 'X₁, X₂ ≥ 0',
  numVars: 2
};

// Page 10 Daily IP Problem
export const DAILY_IP_MODEL = {
  title: 'DAILY IP MODEL',
  objective: 'MINIMIZE Z = 6X₁ + 7X₂ + 8X₃',
  rawObjective: [6, 7, 8],
  isMax: false,
  constraints: [
    { text: '4X₁ + 3X₂ ≥ 15', coefficients: [4, 3, 0], relation: '>=', rhs: 15 },
    { text: '9X₂ + 2X₃ ≥ 24', coefficients: [0, 9, 2], relation: '>=', rhs: 24 },
    { text: '7X₁ + 3X₃ ≥ 10', coefficients: [7, 0, 3], relation: '>=', rhs: 10 },
  ],
  nonNegativity: 'X₁, X₂, X₃ ≥ 0',
  integerConstraint: 'X₁, X₂, X₃ ∈ ℤ',
  numVars: 3
};
