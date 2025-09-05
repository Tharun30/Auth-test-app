// Environment Configuration Manager
export const ENVIRONMENTS = {
  dev: {
    domain: "iddev.mcafee.com",
    clientId: "NC9HSwbcmvvXvrdvXymITAuLPw2GHbEW",
    label: "Development"
  },
  qa: {
    domain: "idqa.mcafee.com", 
    clientId: "fz2YwYovbQwPjQbvxszl2IQ0p3Q14k7Q",
    label: "QA"
  },
  qa3: {
    domain: "idqa3.mcafee.com",
    clientId: "OiINEey2vZXjC0gFxLBLmMJGYX8xbi9x", 
    label: "QA3"
  },
  stg: {
    domain: "idstg.mcafee.com",
    clientId: "gWr7RWzwo7AlVTt9yiWm1Vlnub9vCWFf",
    label: "Staging"
  },
  prod: {
    domain: "id.mcafee.com",
    clientId: "S2iIHFoA0d7kwudTKm5TskxbJW1hWvWv",
    label: "Production"
  }
};

// Default environment
export const DEFAULT_ENVIRONMENT = 'qa';

// Environment state management
let currentEnvironment = DEFAULT_ENVIRONMENT;
let environmentChangeListeners = [];

// Event system for environment changes
export const addEnvironmentChangeListener = (callback) => {
  environmentChangeListeners.push(callback);
  return () => {
    environmentChangeListeners = environmentChangeListeners.filter(cb => cb !== callback);
  };
};

const notifyEnvironmentChange = (newEnv) => {
  // Dispatch window event for DynamicAuth0Provider
  window.dispatchEvent(new CustomEvent('environmentChanged', {
    detail: { environment: newEnv, config: ENVIRONMENTS[newEnv] }
  }));
  
  // Call registered listeners
  environmentChangeListeners.forEach(callback => {
    try {
      callback(newEnv, ENVIRONMENTS[newEnv]);
    } catch (error) {
      console.error('Error in environment change listener:', error);
    }
  });
};

export const setCurrentEnvironment = (env) => {
  if (ENVIRONMENTS[env] && env !== currentEnvironment) {
    const oldEnv = currentEnvironment;
    currentEnvironment = env;
    // Store in sessionStorage to persist during the session but not between browser sessions
    sessionStorage.setItem('mcafee_environment', env);
    console.log(`Environment changed from ${oldEnv} to ${env}`, ENVIRONMENTS[env]);
    
    // Notify immediately with both methods
    notifyEnvironmentChange(env);
    
    // Force a slight delay to ensure React has time to process
    setTimeout(() => {
      console.log('Secondary environment change notification');
      notifyEnvironmentChange(env);
    }, 100);
  }
};

export const getCurrentEnvironment = () => {
  // Check sessionStorage first, then fallback to default
  const stored = sessionStorage.getItem('mcafee_environment');
  if (stored && ENVIRONMENTS[stored]) {
    currentEnvironment = stored;
  }
  return currentEnvironment;
};

export const getCurrentEnvironmentConfig = () => {
  const env = getCurrentEnvironment();
  return ENVIRONMENTS[env];
};

export const getEnvironmentOptions = () => {
  return Object.entries(ENVIRONMENTS).map(([key, config]) => ({
    value: key,
    label: config.label,
    domain: config.domain,
    clientId: config.clientId
  }));
};

// Initialize environment from sessionStorage on load
const initializeEnvironment = () => {
  const stored = sessionStorage.getItem('mcafee_environment');
  if (stored && ENVIRONMENTS[stored]) {
    currentEnvironment = stored;
  }
};

// Auto-initialize
initializeEnvironment();
