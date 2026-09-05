import React, { useState } from 'react';
import Window from '../components/layout/Window';
import Navbar from '../components/layout/Navbar';
import RecentSolvesList from '../components/history/RecentSolvesList';
import ChallengeCalendar from '../components/history/ChallengeCalendar';

import iconSolverH from '../assets/icons/icon-solverh.png';
import iconChallengeH from '../assets/icons/icon-challengeh.png';

const HistoryPage = () => {
  const [selectedView, setSelectedView] = useState(null); // 'solvers' or 'challenges'

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar
        backTo={selectedView ? () => setSelectedView(null) : '/'}
        label={selectedView ? 'RETURN TO HISTORY SELECTION' : 'RETURN TO MAIN SYSTEM'}
      />

      {!selectedView ? (
        /* Page 6: History Selection */
        <div className="solver-grid">
          <Window
            iconSrc={iconSolverH}
            onClick={() => setSelectedView('solvers')}
            altText="Solver History"
          />
          <Window
            iconSrc={iconChallengeH}
            onClick={() => setSelectedView('challenges')}
            altText="Challenge History"
          />
        </div>
      ) : selectedView === 'solvers' ? (
        /* Page 7: Solver History */
        <RecentSolvesList />
      ) : (
        /* Page 8: Challenge History */
        <ChallengeCalendar />
      )}
    </div>
  );
};

export default HistoryPage;