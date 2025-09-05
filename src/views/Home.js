import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewKeyValuePair } from "../feature/commonState";
import { buildFinalConfiguration, cleanConfiguration, separateConfiguration } from "../utils/configurationBuilder";
import { getEnvironmentOptions, getCurrentEnvironment, setCurrentEnvironment } from "../utils/environmentConfig";
import '../styles/mcafee-theme.css';
import '../styles/layout.css';
import '../styles/components.css';

const Home = () => {
  const [togglePrefilEmail, setTogglePrefilEmail] = useState(false);
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
    disableEmail: false,
  });

  const [showRawAAI, setShowRawAAI] = useState(false);
  const [currentEnvironment, setCurrentEnvironmentState] = useState(getCurrentEnvironment());
  
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

  const ChangeEnvironment = (e) => {
    const newEnv = e.target.value;
    setCurrentEnvironment(newEnv);
    setCurrentEnvironmentState(newEnv);
    // Note: Environment is not included in query params or AAI - it's only for configuration
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
  };

  const onBlurF2rt = (e) => {
    dispatch(addNewKeyValuePair({ key: "f2rt", value: e.target.value }));
  };

  const handleInputChange = (key, value) => {
    setCurrentQuery({
      ...currentQuery,
      [key]: value,
    });
    dispatch(addNewKeyValuePair({ key, value }));
  };

  const handleTextInputChange = (key, value) => {
    setCurrentQuery({
      ...currentQuery,
      [key]: value,
    });
  };

  const handleTextInputBlur = (key, value) => {
    dispatch(addNewKeyValuePair({ key, value }));
  };

  return (
    <div className="mcafee-home-layout">
      {/* Left Panel - Customisations */}
      <div className="mcafee-left-panel">
        <div className="mcafee-config-section">
          <h3>Environment Configuration</h3>
          
          <div className="mcafee-input-group">
            <label htmlFor="environment">Environment:</label>
            <select
              id="environment"
              className="mcafee-select"
              value={currentEnvironment}
              onChange={ChangeEnvironment}
            >
              {getEnvironmentOptions().map(env => (
                <option key={env.value} value={env.value}>
                  {env.label} ({env.domain})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mcafee-config-section">
          <h3>Core Customisations</h3>
          
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
              onChange={Changef2rt}
              onBlur={onBlurF2rt}
              placeholder="F2RT value"
            />
          </div>

          <div className="mcafee-switch-group">
            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Pre-fill Email</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={togglePrefilEmail}
                  onChange={(e) => setTogglePrefilEmail(e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>
            
            {togglePrefilEmail && (
              <div className="mcafee-input-group" style={{ marginTop: '10px' }}>
                <label htmlFor="prefillEmail">Email Address:</label>
                <input
                  id="prefillEmail"
                  type="email"
                  className="mcafee-input"
                  value={currentQuery.prefillEmail}
                  onChange={(e) => handleTextInputChange('prefillEmail', e.target.value)}
                  onBlur={(e) => handleTextInputBlur('ea', e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
            )}
          </div>

          <div className="mcafee-switch-group">
            <div className="mcafee-switch-item">
              <span className="mcafee-switch-label">Disable Email</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.disableEmail}
                  onChange={(e) => handleInputChange('disableEmail', e.target.checked)}
                />
                <span className="mcafee-switch-slider"></span>
              </label>
            </div>
          </div>

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
          <h3>Localization & Ids</h3>
          
          <div className="mcafee-input-group">
            <label htmlFor="culture">Culture:</label>
            <input
              id="culture"
              type="text"
              className="mcafee-input"
              value={currentQuery.culture}
              onChange={(e) => handleTextInputChange('culture', e.target.value)}
              onBlur={(e) => handleTextInputBlur('culture', e.target.value)}
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
              onChange={(e) => handleTextInputChange('affid', e.target.value)}
              onBlur={(e) => handleTextInputBlur('affid', e.target.value)}
              placeholder="Affiliate ID"
            />
          </div>

          <div className="mcafee-input-group">
            <label htmlFor="ui_locales">UI Locales:</label>
            <input
              id="ui_locales"
              type="text"
              className="mcafee-input"
              value={currentQuery.ui_locales}
              onChange={(e) => handleTextInputChange('ui_locales', e.target.value)}
              onBlur={(e) => handleTextInputBlur('ui_locales', e.target.value)}
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
              onChange={(e) => handleTextInputChange('deviceRefId', e.target.value)}
              onBlur={(e) => handleTextInputBlur('deviceRefId', e.target.value)}
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
          <h3>OTP Page customisations</h3>
          
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
              <span className="mcafee-switch-label">Skip SMS Passcode (SSP)</span>
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
          <div className="mcafee-custom-header">
            <h3>Add Custom Parameters</h3>
            <div className="mcafee-raw-json-toggle">
              <span className="mcafee-toggle-label">Pass Raw JSON</span>
              <label className="mcafee-switch">
                <input
                  type="checkbox"
                  checked={currentQuery.passRawJSON || false}
                  onChange={(e) => setCurrentQuery({ ...currentQuery, passRawJSON: e.target.checked })}
                />
                <span className="mcafee-slider"></span>
              </label>
            </div>
          </div>
          
          {currentQuery.passRawJSON ? (
            // Raw JSON input mode
            <div className="mcafee-input-group">
              <label htmlFor="rawAAIInput">Raw AAI JSON (replaces all configurations above):</label>
              <textarea
                id="rawAAIInput"
                className="mcafee-textarea"
                rows="10"
                value={currentQuery.rawAAI || ''}
                onChange={(e) => setCurrentQuery({ ...currentQuery, rawAAI: e.target.value })}
                placeholder='Enter raw AAI JSON, e.g.:
{
  "ea": "example",
  "action": "signup",
  "affcc": 123,
  "cc": {
    "Login": {
      "hideGoogleButton": true,
      "enableMSA": true
    }
  }
}'
              />
              <button
                className="mcafee-primary-button"
                onClick={() => {
                  try {
                    const parsedJSON = JSON.parse(currentQuery.rawAAI);
                    // Clear existing Redux state and set raw AAI
                    dispatch(addNewKeyValuePair({ key: "_rawAAI", value: parsedJSON }));
                    console.log('Applied raw AAI JSON:', parsedJSON);
                  } catch (error) {
                    alert('Invalid JSON format. Please check your syntax.');
                  }
                }}
              >
                Apply Raw JSON
              </button>
            </div>
          ) : (
            // Regular parameter input mode
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="mcafee-right-panel">
        <div className="mcafee-panel-header">
          <h2>Customisation Results</h2>
          <p>Current state and generated parameters</p>
          <div className="mcafee-environment-indicator">
            <span className="mcafee-env-label">Environment:</span>
            <span className="mcafee-env-value">{getEnvironmentOptions().find(env => env.value === currentEnvironment)?.label}</span>
            <span className="mcafee-env-domain">({getEnvironmentOptions().find(env => env.value === currentEnvironment)?.domain})</span>
          </div>
        </div>

        {Object.keys(currentValue).length !== 0 || Object.values(currentQuery).some(val => val !== "" && val !== false) ? (
          <div className="mcafee-results-container">
            
            {/* Panel 1: AAI Configuration (moved to top) */}
            <div className="mcafee-results-panel mcafee-aai-panel mcafee-aai-compact">
              <div className="mcafee-aai-header-controls">
                <h3><span role="img" aria-label="Target">🎯</span> AAI Configuration</h3>
                <div className="mcafee-aai-controls">
                  <button 
                    className={`mcafee-toggle-btn ${showRawAAI ? 'active' : ''}`}
                    onClick={() => setShowRawAAI(!showRawAAI)}
                  >
                    {showRawAAI ? 'Show Visual' : 'Show Raw JSON'}
                  </button>
                </div>
              </div>
              
              <div className="mcafee-config-display">
                {(() => {
                  const finalConfig = buildFinalConfiguration(currentValue);
                  const { aai } = separateConfiguration(finalConfig);
                  
                  if (!aai || Object.keys(aai).length === 0) {
                    return (
                      <div className="mcafee-empty-config">
                        <span>No AAI configuration set</span>
                      </div>
                    );
                  }

                  if (showRawAAI) {
                    // Show raw JSON view
                    return (
                      <div className="mcafee-json-display mcafee-aai-json">
                        <pre className="mcafee-json-content">
                          {JSON.stringify(cleanConfiguration(aai), null, 2)}
                        </pre>
                        <button 
                          className="mcafee-copy-icon"
                          onClick={() => navigator.clipboard.writeText(JSON.stringify(cleanConfiguration(aai), null, 2))}
                          title="Copy AAI JSON"
                        >
                          <span role="img" aria-label="Copy">📋</span>
                        </button>
                      </div>
                    );
                  }

                  // Visual AAI rendering (existing logic)
                  const renderNestedAAI = (obj, parentKey = "", depth = 0) => {
                    return Object.entries(obj).map(([key, value], index) => {
                      const currentKey = parentKey ? `${parentKey}.${key}` : key;
                      
                      // Debug logging to see what values we're getting
                      console.log(`Rendering ${key}:`, { value, type: typeof value, isNull: value === null, keys: typeof value === 'object' && value !== null ? Object.keys(value) : 'N/A' });
                      
                      // Handle different value types properly
                      if (value === null) {
                        return (
                          <div key={`${currentKey}-${index}`} className={`mcafee-aai-item depth-${depth}`}>
                            <span className="mcafee-aai-key">{key}</span>
                            <span className="mcafee-aai-value null-value">null</span>
                          </div>
                        );
                      }
                      
                      if (value === undefined) {
                        return (
                          <div key={`${currentKey}-${index}`} className={`mcafee-aai-item depth-${depth}`}>
                            <span className="mcafee-aai-key">{key}</span>
                            <span className="mcafee-aai-value null-value">undefined</span>
                          </div>
                        );
                      }
                      
                      // Check if value is a non-null object with actual properties
                      const isNestedObject = typeof value === 'object' && 
                                           !Array.isArray(value) && 
                                           Object.keys(value).length > 0;
                      
                      if (isNestedObject) {
                        // Count all items including null values
                        const totalItems = Object.keys(value).length;
                        
                        return (
                          <div key={`${currentKey}-${index}`} className={`mcafee-aai-section depth-${depth}`}>
                            <div className="mcafee-aai-header">
                              <span className="mcafee-aai-section-title">{key}</span>
                              <div className="mcafee-aai-badge">{totalItems} items</div>
                            </div>
                            <div className="mcafee-aai-content">
                              {renderNestedAAI(value, currentKey, depth + 1)}
                            </div>
                          </div>
                        );
                      } else {
                        // Handle primitives and empty objects
                        let displayValue;
                        let cssClass = '';
                        
                        if (typeof value === 'boolean') {
                          displayValue = value ? 'true' : 'false';
                        } else if (typeof value === 'object' && Array.isArray(value)) {
                          displayValue = `[Array: ${value.length} items]`;
                          cssClass = 'array-value';
                        } else if (typeof value === 'object' && Object.keys(value).length === 0) {
                          displayValue = '{}';
                          cssClass = 'empty-object';
                        } else if (typeof value === 'string' || typeof value === 'number') {
                          displayValue = String(value);
                        } else {
                          // Fallback for any other object types
                          console.warn('Unexpected object type:', key, value, typeof value);
                          displayValue = JSON.stringify(value);
                        }
                        
                        return (
                          <div key={`${currentKey}-${index}`} className={`mcafee-aai-item depth-${depth}`}>
                            <span className="mcafee-aai-key">{key}</span>
                            <span className={`mcafee-aai-value ${cssClass}`}>
                              {displayValue}
                            </span>
                          </div>
                        );
                      }
                    }).filter(item => item !== null); // Remove only explicitly null entries
                  };

                  return (
                    <div className="mcafee-aai-container">
                      {renderNestedAAI(aai)}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Panel 2: Query Parameters (moved to bottom) */}
            <div className="mcafee-results-panel mcafee-query-panel">
              <h3><span role="img" aria-label="Settings">🔧</span> Query Parameters</h3>
              <div className="mcafee-config-display">
                {(() => {
                  const finalConfig = buildFinalConfiguration(currentValue);
                  const { queryParams } = separateConfiguration(finalConfig);
                  
                  // Helper function to display simple values
                  const renderSimpleValue = (value) => {
                    return typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value);
                  };

                  if (Object.keys(queryParams).length === 0) {
                    return (
                      <div className="mcafee-empty-config">
                        <span>No query parameters configured</span>
                      </div>
                    );
                  }

                  return Object.entries(queryParams).map(([key, value], index) => (
                    <div key={`query-${key}-${index}`} className="mcafee-config-item">
                      <span className="mcafee-config-key">{key}:</span>
                      <span className="mcafee-config-value">
                        {renderSimpleValue(value)}
                      </span>
                    </div>
                  ));
                })()}
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
