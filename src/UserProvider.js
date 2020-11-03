import { createContext, useEffect, useState } from "react";
import { auth, setOnline } from "./services/firebase";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasError, setErrorStatus] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (newUser) => {
      try {
        if (newUser) {
          const { uid, displayName: name, email, photoURL: avatar } = newUser;
          await setOnline({ uid, email, name, avatar });
          setUser({ uid, email, name, avatar });
          setErrorStatus(false);
        } else {
          setUser(null);
        }
      } catch (error) {
        setErrorStatus(true);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, hasError }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
