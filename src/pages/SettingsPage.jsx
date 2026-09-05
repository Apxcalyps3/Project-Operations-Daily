import React, { useState } from 'react';
import Window from '../components/layout/Window';
import Navbar from '../components/layout/Navbar';
import AuthModal from '../components/settings/AuthModal';
import ThemeToggle from '../components/settings/ThemeToggle';
import FeedbackForm from '../components/settings/FeedbackForm';

import iconAccount from '../assets/icons/icon-account.png';
import iconTheme from '../assets/icons/icon-theme.png';
import iconReview from '../assets/icons/icon-review.png';

const SettingsPage = () => {
  const [selectedSetting, setSelectedSetting] = useState(null); // 'account', 'theme', 'review'

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar
        backTo={selectedSetting ? () => setSelectedSetting(null) : '/'}
        label={selectedSetting ? 'RETURN TO SETTINGS' : 'RETURN TO MAIN SYSTEM'}
      />

      {!selectedSetting ? (
        /* Page 11: Settings Selection */
        <div className="home-grid" style={{ maxWidth: '900px' }}>
          <Window
            iconSrc={iconAccount}
            onClick={() => setSelectedSetting('account')}
            altText="Account"
          />
          <Window
            iconSrc={iconTheme}
            onClick={() => setSelectedSetting('theme')}
            altText="Change Theme"
          />
          <Window
            iconSrc={iconReview}
            onClick={() => setSelectedSetting('review')}
            altText="Review"
          />
        </div>
      ) : selectedSetting === 'account' ? (
        /* Page 12: Account / Sign In / Sign Up */
        <AuthModal onClose={() => setSelectedSetting(null)} />
      ) : selectedSetting === 'theme' ? (
        /* Page 13: Change Theme (Dark / Light) */
        <ThemeToggle />
      ) : (
        /* Page 14: Review & Feedback */
        <FeedbackForm />
      )}
    </div>
  );
};

export default SettingsPage;