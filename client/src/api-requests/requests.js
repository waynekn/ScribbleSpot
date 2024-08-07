import axios from "axios";
export const URL = `http://localhost:8000`;

export const authenticateUser = (provider, action) => {
  window.location.href = `${URL}/auth/${provider}/${action}`;
};

export const getUserProfile = async () => {
  return axios.get(`${URL}/users/profile`);
};

export const signOutUser = () => {
  return axios.post(`${URL}/auth/logout`);
};

export const checkAuthStatus = () => {
  return axios.post(`${URL}/auth-status`);
};

export const getImageUrl = async (imageKey) => {
  return await axios.post(`${URL}/users/profile/profile-picture`, {
    imageKey,
  });
};
