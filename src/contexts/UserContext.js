import { createContext, useState, useEffect } from "react";

const UserContext = createContext();
const admins = ["CamilleCooper"]

function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const isLoggedIn = user ? true : false;
  const uid = user ? user.uid : null;
  const username = user ? user.displayName : null;
  const email = user ? user.email : null;
  const fullName = user ? user.displayName : null;
  const isAdmin = admins.includes(username);

  // useEffect(() => {
  //   if (!user) return null;

  //   fetch("http://localhost:8080/users/read/" + username)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // Set state variables here based on server response
  //       // For example, setIsAdmin(res.admin);
  //     });
  // }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        uid,
        username,
        email,
        fullName,
        isLoggedIn,
        isAdmin,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
