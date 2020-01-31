import axios from 'axios';

/**
 * Load / delete token from global header so don't have
 * to keep setting it on axios calls.
 */
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
