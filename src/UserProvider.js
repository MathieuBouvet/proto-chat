import { createContext, useEffect, useState } from "react";
import { auth } from "./services/firebase";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName: name, email, photoURL } = user;
        setUser({ email, name, photoURL });
      } else {
        setUser(null);
      }
    });
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
export { UserContext };
