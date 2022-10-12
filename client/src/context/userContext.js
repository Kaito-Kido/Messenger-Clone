import React, { useEffect, useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();
export const ChangeUserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const userLogin = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
        localStorage.clear();
        setUser(null);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ChangeUserContext.Provider value={userLogin}>
        {children}
      </ChangeUserContext.Provider>
    </UserContext.Provider>
  );
};
