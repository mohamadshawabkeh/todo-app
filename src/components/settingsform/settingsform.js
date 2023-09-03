import React, { useState } from 'react';
import { useSettings } from '../../context/settings/index';
import List from '../settingList/list';
import './settingsform.scss';

function SettingsForm() {
  const { settings, updateSettings } = useSettings();
  const [displayCount, setDisplayCount] = useState(settings.displayCount);
  const [hideCompleted, setHideCompleted] = useState(settings.hideCompleted);
  const [searchKeyword, setSearchKeyword] = useState('difficulty'); 
  const [updatedSearchKeyword, setUpdatedSearchKeyword] = useState('difficulty'); 

  const handleSaveSettings = () => {
    updateSettings({
      ...settings,
      displayCount,
      hideCompleted,
    });
    setSearchKeyword(updatedSearchKeyword);
  };

  return (
    <div className="settings-form-container">
      <div className="settings-header">
        <h1 className="settings-title">⚙️ Manage Settings</h1>
      </div>

      <div className="settings-content">
        <label className="settings-label">
          Display Count:
          <input
            className="settings-input"
            type="number"
            value={displayCount}
            onChange={(e) => setDisplayCount(Number(e.target.value))}
          />
        </label>
        <label className="settings-label">
          Hide Completed:
          <input
            className="settings-input"
            type="checkbox"
            checked={hideCompleted}
            onChange={(e) => setHideCompleted(e.target.checked)}
          />
        </label>
        <label className="settings-label">
          Search by Keyword:
          <input
            className="settings-input"
            type="text"
            value={updatedSearchKeyword}
            onChange={(e) => setUpdatedSearchKeyword(e.target.value)}
          />
        </label>
        <button className="settings-button" onClick={handleSaveSettings}>Save Settings</button>
      </div>

      <List searchKeyword={searchKeyword} />
    </div>
  );
}

export default SettingsForm;
