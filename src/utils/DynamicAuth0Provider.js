import React, { useState, useEffect } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { getCurrentEnvironmentConfig } from './environmentConfig';
import history from './history';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const DynamicAuth0Provider = ({ children }) => {
  const [auth0Config, setAuth0Config] = useState(null);
  const [key, setKey] = useState(0); // Force re-render when config changes

  useEffect(() => {
    // Initial config setup
    const initialConfig = getCurrentEnvironmentConfig();
    setAuth0Config(initialConfig);
    console.log('DynamicAuth0Provider: Initial config set:', initialConfig);

    // Listen for environment changes
    const handleEnvironmentChange = (event) => {
      const { environment, config } = event.detail || {};
      console.log('DynamicAuth0Provider: Environment changed event received:', environment, config);
      
      setAuth0Config(config);
      setKey(prev => prev + 1); // Force Auth0Provider to completely re-mount
    };

    window.addEventListener('environmentChanged', handleEnvironmentChange);

    return () => {
      window.removeEventListener('environmentChanged', handleEnvironmentChange);
    };
  }, []);

  // Show loading while config is being set up
  if (!auth0Config) {
    return <div>Loading Auth0...</div>;
  }

  const providerConfig = {
    domain: auth0Config.domain,
    clientId: auth0Config.clientId,
    audience: "https://api.mcafee.com",
    redirectUri: window.location.origin,
    useRefreshTokens: true,
    scope: "openid profile email enroll read:authenticators remove:authenticators offline_access",
    onRedirectCallback,
  };

  console.log('DynamicAuth0Provider rendering with config:', providerConfig, 'key:', key);

  return (
    <div key={`auth0-wrapper-${key}`}>
      <Auth0Provider key={key} {...providerConfig}>
        {children}
      </Auth0Provider>
    </div>
  );
};

export default DynamicAuth0Provider;
