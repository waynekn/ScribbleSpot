export const URL = `http://localhost:8000`;

export const authenticateUser = (provider, action) => {
  window.location.href = `${URL}/auth/${provider}/${action}`;
};

export const getProfile = async () => {};
