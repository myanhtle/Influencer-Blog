import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return null;

    // fetch("URL")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // Set state variables here based on server response
    //     // For example, setIsAdmin(res.admin);
    //   });
  }, [user]);

  const isLoggedIn = user ? true : false;
  const uid = user.uid;
  const username = user.username;
  return (
    <UserContext.Provider
      value={{ user, uid, username, isLoggedIn, isAdmin, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
