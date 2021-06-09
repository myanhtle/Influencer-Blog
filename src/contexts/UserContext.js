import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const isLoggedIn = user ? true : false;
  const uid = user ? user.uid : null;
  const username = user ? user.displayName : null;
  const email = user ? user.email : null;

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
      value={{ user, uid, username, email, isLoggedIn, isAdmin, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
