import { useEffect, useContext } from "react";

import Topbar from "./components/Topbar";
import Landing from "./components/Landing";
import { UserContext } from "./UserProvider";
import { ErrorContext, reporter } from "./ErrorCatcher";
import { signOut, setOnline } from "./services/firebase";
import Chat from "./components/Chat";

import "./App.scss";

function App() {
  const user = useContext(UserContext);
  const { dispatchError } = useContext(ErrorContext);
  useEffect(() => {
    const withReadDatabaseReporter = reporter(dispatchError, "read-database");
    withReadDatabaseReporter(async () => {
      if (user) {
        await setOnline(user);
      }
    })();
  }, [user, dispatchError]);
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
