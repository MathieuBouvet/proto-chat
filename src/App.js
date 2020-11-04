import { useEffect, useContext } from "react";

import Topbar from "./components/Topbar";
import Landing from "./components/Landing";
import { UserContext } from "./UserProvider";
import { ErrorContext, createError, dismiss } from "./ErrorCatcher";
import { signOut, setOnline } from "./services/firebase";
import Chat from "./components/Chat";

import "./App.scss";

function App() {
  const user = useContext(UserContext);
  const { errorReporter } = useContext(ErrorContext);
  useEffect(() => {
    (async () => {
      try {
        if (user) {
          await setOnline(user);
          errorReporter(dismiss("read-database"));
        }
      } catch (error) {
        errorReporter(createError("read-database", error));
      }
    })();
  }, [user, errorReporter]);
  useEffect(() => {
    window.addEventListener("beforeunload", signOut);
    return () => window.removeEventListener("beforeunload", signOut);
  }, []);
  return (
    <div className="App">
      <Topbar />
      {!user ? <Landing /> : <Chat />}
    </div>
  );
}

export default App;
