import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { buildFinalConfiguration } from "../utils/configurationBuilder";
import { addEnvironmentChangeListener } from "../utils/environmentConfig";

const NavBar = (props) => {
  const currentValue = useSelector((state) => state.counter.value);
  const value = useLocation().search;
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getIdTokenClaims,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const [finalState, setFinalState] = useState({});
  
  // Dark mode state - default to true (dark mode enabled), no localStorage
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Listen for environment changes
  useEffect(() => {
    const unsubscribe = addEnvironmentChangeListener((newEnv, newConfig) => {
      console.log('NavBar: Environment changed to', newEnv, newConfig);
      // Force re-render to pick up new environment
      setFinalState(prev => ({ ...prev }));
    });

    return unsubscribe;
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);
  
  const getAccessToken = async () => {
    if (isAuthenticated) {
      const data = await getAccessTokenSilently({ detailedResponse: true });
      const data2 = await getIdTokenClaims();
      console.log(data2, "access");
      props.setResponse({ AccessToken: data, IdToken: data2?.__raw });
    }
  };
  
  useEffect(() => {
    function UseQuery() {
      return new URLSearchParams(value);
    }
    const AffId = () => {
      let query = UseQuery();
      const parsedHash = new URLSearchParams(window.location.hash.substr(1));
      let culture = query.get("affid") ?? parsedHash.get("affid");
      return culture;
    };
    const Culture = () => {
      let query = UseQuery();
      const parsedHash = new URLSearchParams(window.location.hash.substr(1));
      let culture = query.get("culture") ?? parsedHash.get("culture");
      return culture;
    };
    
    // Use the common utility function to build final configuration
    const finalConfiguration = buildFinalConfiguration(currentValue, { Culture, AffId });
    setFinalState(finalConfiguration);

    // Also pass the same data to parent component
    if (props.setFinalState) {
      props.setFinalState(finalConfiguration);
    }
    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue, value]);
  
  console.log("---->In the Navbar", finalState, currentValue);

  return (
    <div className="mcafee-navbar">
      <div className="mcafee-navbar-container">
        <a href="/" className="mcafee-logo">
          Auth Test App
        </a>
        
        <nav className="mcafee-nav-links">
          {isAuthenticated && (
            <>
              <a href="/profile" className="mcafee-nav-link">
                <FontAwesomeIcon icon="user" />
                <span>Profile</span>
              </a>
              <a href="/external-api" className="mcafee-nav-link">
                <FontAwesomeIcon icon="cloud" />
                <span>External API</span>
              </a>
              <a href="/custom-claims" className="mcafee-nav-link">
                <FontAwesomeIcon icon="cogs" />
                <span>Custom Claims</span>
              </a>
              <a href="/main-component" className="mcafee-nav-link">
                <FontAwesomeIcon icon="shield-alt" />
                <span>Enroll MFA</span>
              </a>
            </>
          )}
        </nav>

        <div className="mcafee-user-section">
          <div className="mcafee-dark-mode-switch">
            <span className="mcafee-switch-label">
              <FontAwesomeIcon icon="sun" />
            </span>
            <label className="mcafee-switch">
              <input 
                type="checkbox" 
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <span className="mcafee-switch-slider"></span>
            </label>
            <span className="mcafee-switch-label">
              <FontAwesomeIcon icon="moon" />
            </span>
          </div>
          
          {!isAuthenticated ? (
            <button
              className="mcafee-auth-button"
              onClick={() => {
                localStorage.setItem("culture", finalState?.culture);
                console.log('Logging in with Auth0 SDK and final state:', finalState);
                
                // Use Auth0 SDK loginWithRedirect with AAI parameters
                const loginOptions = {
                  ...finalState,
                  source: "suhas-test"
                };
                
                // Convert AAI object to JSON string if it exists
                if (finalState.aai) {
                  loginOptions.aai = JSON.stringify(finalState.aai);
                }
                
                loginWithRedirect(loginOptions);
              }}
            >
              <FontAwesomeIcon icon="sign-in-alt" />
              Log In
            </button>
          ) : (
            <div className="mcafee-user-info">
              <div className="mcafee-user-avatar">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <span className="mcafee-user-email">{user?.name || user?.email}</span>
              <button
                className="mcafee-logout-button"
                onClick={() => {
                  // Use Auth0 SDK logout
                  logout({ 
                    logoutParams: { 
                      returnTo: window.location.origin 
                    } 
                  });
                }}
              >
                <FontAwesomeIcon icon="power-off" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
