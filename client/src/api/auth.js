import axios from "axios";

export const signUp = (user) => axios.post(`/register`, user);

export const logIn = (user) =>
  axios.post(`/login`, user, {
    withCredentials: true,
  });

export const logOut = () => axios.get(`/logout`, { withCredentials: true });

export const refresh = async () => {
  await axios.get(`/refresh`, {
    withCredentials: true,
  });
};
