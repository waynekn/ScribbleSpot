import axios from "axios";
export const URL = `http://localhost:8000`;

export const authenticateUser = (provider, action) => {
  window.location.href = `${URL}/auth/${provider}/${action}`;
};

export const getUserProfile = async () => {
  const res = await axios.get(`${URL}/users/profile`);
  return res.data;
};

export const signOutUser = () => {
  axios.post(`${URL}/auth/logout`);
};
