import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewKeyValuePair } from "../feature/commonState";
import '../styles/mcafee-theme.css';
import '../styles/layout.css';
import '../styles/components.css';

const Home = ({ finalState }) => {
  const [currentQuery, setCurrentQuery] = useState({
    query: "",
    value: "",
    culture: "",
    prefillEmail: "",
    affid: "",
    affcc: "",
    landing_screen: "login",
    hideLoginCTA: false,
    hideSignUp: false,
    ui_locales: "",
    enableBack: false,
    enableSkip: false,
    hideHeader: false,
    hideFooter: false,
    hideGoogleLogin: false,
    hideGoogleSignUp: false,
    enableMSALogin: false,
    enableMSASignUp: false,
    enableGoogleLogin: false,
    enableGoogleSignup: false,
    enableAppleLogin: false,
    enableAppleSignup: false,
    deviceRefId: "",
    hideLoginCTAfromOTP: false,
    hideResetPwdLink: false,
    soes: false,
    ssp: false,
    action: "",
    f2rt: "",
    f2rs: "",
  });

  const currentValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const GetSomething = () => {
    dispatch(
      addNewKeyValuePair({ key: currentQuery.query, value: currentQuery.value })
    );
  };

  const ChangeLanding = (e) => {
    setCurrentQuery({
      ...currentQuery,
      landing_screen: e.target.value,
    });
    dispatch(addNewKeyValuePair({ key: "mode", value: e.target.value }));
  };

  const ChangeAction = (e) => {
    setCurrentQuery({
      ...currentQuery,
      action: e.target.value,
    });
    dispatch(addNewKeyValuePair({ key: "action", value: e.target.value }));
  };

  const Changef2rs = (e) => {
    setCurrentQuery({
      ...currentQuery,
      f2rs: e.target.value,
    });
    dispatch(addNewKeyValuePair({ key: "f2rs", value: e.target.value }));
  };

  const Changef2rt = (e) => {
    setCurrentQuery({
      ...currentQuery,
      f2rt: e.target.value,
    });
    dispatch(addNewKeyValuePair({ key: "f2rt", value: e.target.value }));
  };

  const handleInputChange = (key, value) => {
    setCurrentQuery({
      ...currentQuery,
      [key]: value,
    });
    dispatch(addNewKeyValuePair({ key, value }));
  };

  return (
    <div className="mcafee-home-layout">
      {/* Left Panel - Customisations */}
      <div className="mcafee-left-panel">
        <div className="mcafee-config-section">
          <h3>Core Configuration</h3>
          
          <div className="mcafee-input-group">
            <label htmlFor="landing_screen">Landing Screen Selection:</label>
            <select
              id="landing_screen"
              className="mcafee-select"
              value={currentQuery.landing_screen}
              onChange={ChangeLanding}
            >
              <option value="login">Login Page (Default)</option>
              <option value="login_otp">OTP Login Page</option>
              <option value="register">Signup Page</option>
            </select>
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="action">Action Type:</label>
            <select
              id="action"
              className="mcafee-select"
              value={currentQuery.action}
              onChange={ChangeAction}
            >
              <option value="">Default</option>
              <option value="force_verification">Force Verification</option>
            </select>
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="f2rs">F2RS:</label>
            <select
              id="f2rs"
              className="mcafee-select"
              value={currentQuery.f2rs}
              onChange={Changef2rs}
            >
              <option value="">Default</option>
              <option value="ADMIN">Admin</option>
              <option value="ProductLoudRegistrationToReal">ProductLoudRegistrationToReal</option>
              <option value="OneTimeCredential">OneTimeCredential</option>
              <option value="mpc">mpc</option>
              <option value="m1a">m1a</option>
              <option value="wss">wss</option>
              <option value="vds">vds</option>
              <option value="wps">wps</option>
              <option value="cmac">cmac</option>
              <option value="m1ac">m1ac</option>
              <option value="sb">sb</option>
              <option value="wa">wa</option>
              <option value="vzm1a">vzm1a</option>
              <option value="tnmyaccount">tnmyaccount</option>
              <option value="tnkeycard">tnkeycard</option>
              <option value="sdk-vz">sdk-vz</option>
            </select>
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="f2rt">F2RT:</label>
            <input
              id="f2rt"
              type="text"
              className="mcafee-input"
              value={currentQuery.f2rt}
              onChange={(e) => handleInputChange('f2rt', e.target.value)}
              placeholder="F2RT value"
            />
          </div>
        </div>

        <div className="mcafee-config-section">
          <h3>Localization & Identity</h3>
          
          <div className="mcafee-input-group">
            <label htmlFor="culture">Culture:</label>
            <input
              id="culture"
              type="text"
              className="mcafee-input"
              value={currentQuery.culture}
              onChange={(e) => handleInputChange('culture', e.target.value)}
              placeholder="e.g., en-US"
            />
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="affid">Affiliate ID:</label>
            <input
              id="affid"
              type="text"
              className="mcafee-input"
              value={currentQuery.affid}
              onChange={(e) => handleInputChange('affid', e.target.value)}
              placeholder="Affiliate ID"
            />
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="prefillEmail">Prefill Email:</label>
            <input
              id="prefillEmail"
              type="email"
              className="mcafee-input"
              value={currentQuery.prefillEmail}
              onChange={(e) => handleInputChange('prefillEmail', e.target.value)}
              placeholder="user@example.com"
            />
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="ui_locales">UI Locales:</label>
            <input
              id="ui_locales"
              type="text"
              className="mcafee-input"
              value={currentQuery.ui_locales}
              onChange={(e) => handleInputChange('ui_locales', e.target.value)}
              placeholder="e.g., en-us"
            />
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="deviceRefId">Device Reference ID:</label>
            <input
              id="deviceRefId"
              type="text"
              className="mcafee-input"
              value={currentQuery.deviceRefId}
              onChange={(e) => handleInputChange('deviceRefId', e.target.value)}
              placeholder="44a02402-1d8b-4e99-8c40-6bead9438cc8"
            />
          </div>
        </div>

        {/* Conditional Sections */}
        {currentQuery.landing_screen === "register" && (
          <div className="mcafee-config-section">
            <h3>Register Page Settings</h3>
            
            <div className="mcafee-switch-group">
              <div className="mcafee-switch-item">
                <span className="mcafee-switch-label">Hide Login CTA</span>
                <label className="mcafee-switch">
                  <input
                    type="checkbox"
                    checked={currentQuery.hideLoginCTA}
                    onChange={(e) => handleInputChange('hideLoginCTA', e.target.checked)}
                  />
                  <span className="mcafee-switch-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {currentQuery.landing_screen === "login" && (
          <div className="mcafee-config-section">
            <h3>Login Page Settings</h3>
            
            <div className="mcafee-switch-group">
              <div className="mcafee-switch-item">
                <span className="mcafee-switch-label">Hide Sign Up</span>
                <label className="mcafee-switch">
                  <input
                    type="checkbox"
                    checked={currentQuery.hideSignUp}
                    onChange={(e) => handleInputChange('hideSignUp', e.target.checked)}
                  />
                  <span className="mcafee-switch-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mcafee-config-section">
          <h3>UI Configuration</h3>
          
          <div className="mcafee-switch-group">
            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable Back</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableBack}
                  onChange={(e) => handleInputChange('enableBack', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable Skip</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableSkip}
                  onChange={(e) => handleInputChange('enableSkip', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Hide Header</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.hideHeader}
                  onChange={(e) => handleInputChange('hideHeader', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Hide Footer</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.hideFooter}
                  onChange={(e) => handleInputChange('hideFooter', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="mcafee-config-section">
          <h3>Social Login Options</h3>
          
          <div className="mcafee-switch-group">
            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Hide Google Login</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.hideGoogleLogin}
                  onChange={(e) => handleInputChange('hideGoogleLogin', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Hide Google Sign Up</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.hideGoogleSignUp}
                  onChange={(e) => handleInputChange('hideGoogleSignUp', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable MSA Login</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableMSALogin}
                  onChange={(e) => handleInputChange('enableMSALogin', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable MSA Sign Up</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableMSASignUp}
                  onChange={(e) => handleInputChange('enableMSASignUp', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable Google Login</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableGoogleLogin}
                  onChange={(e) => handleInputChange('enableGoogleLogin', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable Google Signup</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableGoogleSignup}
                  onChange={(e) => handleInputChange('enableGoogleSignup', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable Apple Login</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableAppleLogin}
                  onChange={(e) => handleInputChange('enableAppleLogin', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Enable Apple Signup</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.enableAppleSignup}
                  onChange={(e) => handleInputChange('enableAppleSignup', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="mcafee-config-section">
          <h3>OTP & Security Settings</h3>
          
          <div className="mcafee-switch-group">
            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Hide Login CTA from OTP</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.hideLoginCTAfromOTP}
                  onChange={(e) => handleInputChange('hideLoginCTAfromOTP', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Hide Reset Password Link</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.hideResetPwdLink}
                  onChange={(e) => handleInputChange('hideResetPwdLink', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Skip Email OTP Screen (SOES)</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.soes}
                  onChange={(e) => handleInputChange('soes', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>

            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Skip Set Password (SSP)</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.ssp}
                  onChange={(e) => handleInputChange('ssp', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="mcafee-config-section">
          <h3>Add Custom Parameters</h3>
          
          <div className="mcafee-input-group">
            <label htmlFor="customKey">Parameter Name:</label>
            <input
              id="customKey"
              type="text"
              className="mcafee-input"
              value={currentQuery.query}
              onChange={(e) => setCurrentQuery({ ...currentQuery, query: e.target.value })}
              placeholder="Parameter name"
            />
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="customValue">Parameter Value:</label>
            <input
              id="customValue"
              type="text"
              className="mcafee-input"
              value={currentQuery.value}
              onChange={(e) => setCurrentQuery({ ...currentQuery, value: e.target.value })}
              placeholder="Parameter value"
            />
          </div>

          <button
            className="mcafee-primary-button"
            onClick={GetSomething}
          >
            Apply Customisations
          </button>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="mcafee-right-panel">
        <div className="mcafee-panel-header">
          <h2>Customisation Results</h2>
          <p>Current state and generated parameters</p>
        </div>

        {Object.keys(currentValue).length !== 0 || finalState ? (
          <div className="mcafee-results-container">
            
            {/* Panel 1: Selected Customisations */}
            <div className="mcafee-results-panel">
              <h3>Selected Customisations</h3>
              <div className="mcafee-config-display">
                {finalState && finalState.aai && Object.entries(finalState.aai).map(([key, value], index) => {
                  // Skip null/empty values and complex objects except for simple properties
                  if (value === null || value === undefined || value === '') return null;
                  
                  if (typeof value === 'object' && key === 'cc') {
                    // Handle cc object - flatten Login and SignUp properties
                    const results = [];
                    if (value.Login) {
                      Object.entries(value.Login).forEach(([loginKey, loginValue]) => {
                        if (loginValue !== null && loginValue !== undefined && loginValue !== '') {
                          results.push(
                            <div key={`login-${loginKey}`} className="mcafee-config-item">
                              <span className="mcafee-config-key">Login.{loginKey}:</span>
                              <span className="mcafee-config-value">
                                {typeof loginValue === 'boolean' ? (loginValue ? 'true' : 'false') : String(loginValue)}
                              </span>
                            </div>
                          );
                        }
                      });
                    }
                    if (value.SignUp) {
                      Object.entries(value.SignUp).forEach(([signupKey, signupValue]) => {
                        if (signupValue !== null && signupValue !== undefined && signupValue !== '') {
                          results.push(
                            <div key={`signup-${signupKey}`} className="mcafee-config-item">
                              <span className="mcafee-config-key">SignUp.{signupKey}:</span>
                              <span className="mcafee-config-value">
                                {typeof signupValue === 'boolean' ? (signupValue ? 'true' : 'false') : String(signupValue)}
                              </span>
                            </div>
                          );
                        }
                      });
                    }
                    return results;
                  } else if (typeof value !== 'object') {
                    return (
                      <div key={`aai-${key}`} className="mcafee-config-item">
                        <span className="mcafee-config-key">{key}:</span>
                        <span className="mcafee-config-value">
                          {typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
                
                {/* Also show top-level finalState properties */}
                {finalState && Object.entries(finalState).filter(([key]) => key !== 'aai').map(([key, value], index) => {
                  if (value === null || value === undefined || value === '') return null;
                  return (
                    <div key={`final-${key}`} className="mcafee-config-item">
                      <span className="mcafee-config-key">{key}:</span>
                      <span className="mcafee-config-value">
                        {typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel 2: Raw AAI JSON */}
            <div className="mcafee-results-panel">
              <h3>Raw AAI JSON</h3>
              <div className="mcafee-json-display">
                <pre className="mcafee-json-content">
                  {JSON.stringify(finalState?.aai || {}, null, 2)}
                </pre>
                <button 
                  className="mcafee-copy-btn"
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(finalState?.aai || {}, null, 2))}
                >
                  Copy AAI JSON
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="mcafee-empty-state">
            <div className="mcafee-empty-icon">
              <span role="img" aria-label="Settings">⚙️</span>
            </div>
            <h3>No Customisations Set</h3>
            <p>Configure settings in the left panel to see results here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
