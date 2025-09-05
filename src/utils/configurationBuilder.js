/**
 * Common utility to build the final configuration object
 * Used by both Home.js (for display) and NavBar.js (for authentication)
 */

export const buildFinalConfiguration = (currentValue, urlParams = {}) => {
  // Extract URL parameters if provided
  const { Culture, AffId } = urlParams;
  
  // Check if raw AAI JSON is provided - if so, use it instead of building from individual options
  if (currentValue?._rawAAI) {
    const config = {};
    
    // Always include culture and affid with defaults
    config.culture = currentValue?.culture || (Culture && Culture()) || "";
    config.affid = currentValue?.affid || (AffId && AffId()) || 0;
    
    // Use the raw AAI JSON directly
    config.aai = currentValue._rawAAI;
    
    return config;
  }
  
  // Helper function to only add properties with actual values
  const addIfHasValue = (obj, key, value) => {
    if (value !== null && value !== undefined && value !== "" && value !== false) {
      obj[key] = value;
    }
  };
  
  // Build configuration object with only non-empty values
  const config = {};
  
  // Always include culture and affid with defaults
  config.culture = currentValue?.culture || (Culture && Culture()) || "";
  config.affid = currentValue?.affid || (AffId && AffId()) || 0;
  
  // Only include boolean flags if they are true
  addIfHasValue(config, 'enableBack', currentValue?.enableBack);
  addIfHasValue(config, 'devicerefid', currentValue?.deviceRefId);
  addIfHasValue(config, 'enableSkip', currentValue?.enableSkip);
  addIfHasValue(config, 'hideHeader', currentValue?.hideHeader);
  addIfHasValue(config, 'hideFooter', currentValue?.hideFooter);
  addIfHasValue(config, 'ui_locales', currentValue?.ui_locales);
  addIfHasValue(config, 'deviceId', currentValue?.deviceId);
  
  // Build AAI object
  const aai = {};
  
  // Add ea and action only if they exist
  addIfHasValue(aai, 'ea', currentValue?.ea);
  addIfHasValue(aai, 'action', currentValue?.action);
  
  // Add affcc if affid has a value (not 0)
  const affccValue = currentValue?.affid || (AffId && AffId()) || 0;
  if (affccValue !== 0) {
    aai.affcc = affccValue;
  }
  
  addIfHasValue(aai, 'f2rt', currentValue?.f2rt);
  addIfHasValue(aai, 'f2rs', currentValue?.f2rs);
  
  // Build cc object only if we have Login or SignUp configurations
  const cc = {};
  const login = {};
  const signup = {};
  
  // Login configuration - only add if true
  addIfHasValue(login, 'hideLoginCTA', currentValue?.hideLoginCTAfromOTP);
  addIfHasValue(login, 'hideResetPwdLink', currentValue?.hideResetPwdLink);
  addIfHasValue(login, 'hideGoogleButton', currentValue?.hideGoogleLogin);
  addIfHasValue(login, 'ssp', currentValue?.ssp);
  addIfHasValue(login, 'soes', currentValue?.soes);
  addIfHasValue(login, 'enableMSA', currentValue?.enableMSALogin);
  addIfHasValue(login, 'enableGoogle', currentValue?.enableGoogleLogin);
  addIfHasValue(login, 'enableApple', currentValue?.enableAppleLogin);
  
  // Handle hideSignUp and disableEmail based on mode
  if (currentValue?.mode !== "register") {
    addIfHasValue(login, 'hideSignUp', currentValue?.hideSignUp);
    addIfHasValue(login, 'disableEmail', currentValue?.disableEmail);
  }
  
  // SignUp configuration - only add if true
  addIfHasValue(signup, 'hideGoogleButton', currentValue?.hideGoogleSignUp);
  addIfHasValue(signup, 'enableMSA', currentValue?.enableMSASignUp);
  addIfHasValue(signup, 'enableGoogle', currentValue?.enableGoogleSignup);
  addIfHasValue(signup, 'enableApple', currentValue?.enableAppleSignup);
  
  // Handle register mode specific properties
  if (currentValue?.mode === "register") {
    addIfHasValue(signup, 'hideLoginCTA', currentValue?.hideLoginCTA);
    addIfHasValue(signup, 'disableEmail', currentValue?.disableEmail);
  }
  
  // Only add Login/SignUp sections if they have properties
  if (Object.keys(login).length > 0) {
    cc.Login = login;
  }
  if (Object.keys(signup).length > 0) {
    cc.SignUp = signup;
  }
  
  // Add mode if it exists
  addIfHasValue(cc, 'mode', currentValue?.mode);
  
  // Only add cc if it has properties
  if (Object.keys(cc).length > 0) {
    aai.cc = cc;
  }
  
  // Always add aai - if it has no content, send empty object
  if (Object.keys(aai).length > 0) {
    config.aai = aai;
  } else {
    config.aai = {};
  }
  
  return config;
};

// Helper function to clean the configuration (remove null/undefined values)
export const cleanConfiguration = (config) => {
  if (config === null || config === undefined) {
    return config;
  }
  
  if (Array.isArray(config)) {
    return config
      .map(item => cleanConfiguration(item))
      .filter(item => item !== null && item !== undefined && item !== "");
  }
  
  if (typeof config === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(config)) {
      const cleanedValue = cleanConfiguration(value);
      if (cleanedValue !== null && cleanedValue !== undefined && cleanedValue !== "") {
        cleaned[key] = cleanedValue;
      }
    }
    return cleaned;
  }
  
  return config;
};

// Helper function to separate AAI from other query parameters
export const separateConfiguration = (config) => {
  const { aai, ...queryParams } = config;
  return {
    queryParams: cleanConfiguration(queryParams),
    aai: cleanConfiguration(aai)
  };
};
