import { getCurrentEnvironmentConfig } from './environmentConfig';

// Generate random string for nonce and state
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate code challenge for PKCE
const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

// Custom Auth0 login that uses current environment configuration
export const loginWithCurrentEnvironment = async (loginOptions = {}) => {
  const envConfig = getCurrentEnvironmentConfig();
  
  console.log('Logging in with environment:', envConfig);
  
  // Generate PKCE parameters
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const nonce = generateRandomString(32);
  const stateValue = generateRandomString(32);
  
  // Store code verifier for token exchange
  sessionStorage.setItem('code_verifier', codeVerifier);
  
  // Build Auth0 authorization URL with all required parameters
  const params = new URLSearchParams({
    response_type: 'code',
    response_mode: 'query',
    client_id: envConfig.clientId,
    redirect_uri: window.location.origin,
    scope: 'openid profile email enroll read:authenticators remove:authenticators offline_access',
    audience: 'https://api.mcafee.com',
    state: stateValue,
    nonce: nonce,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    auth0Client: btoa(JSON.stringify({ name: 'auth0-react', version: '1.8.0' })),
    ...loginOptions
  });

  // If there are AAI parameters, add them
  if (loginOptions.aai) {
    params.set('aai', loginOptions.aai);
  }
  
  // Add any other custom parameters
  Object.keys(loginOptions).forEach(key => {
    if (key !== 'aai' && loginOptions[key] !== undefined && loginOptions[key] !== '') {
      params.set(key, loginOptions[key]);
    }
  });

  const authUrl = `https://${envConfig.domain}/authorize?${params.toString()}`;
  
  console.log('Redirecting to:', authUrl);
  
  // Redirect to Auth0
  window.location.href = authUrl;
};

// Helper function to get logout URL for current environment
export const getLogoutUrlForCurrentEnvironment = (returnTo = window.location.origin) => {
  const envConfig = getCurrentEnvironmentConfig();
  return `https://${envConfig.domain}/logout?redirectTo=${returnTo}&clientId=${envConfig.clientId}`;
};
