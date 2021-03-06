import { useEffect, useContext } from "react";

import Topbar from "./components/Topbar";
import Landing from "./components/Landing";
import { UserContext } from "./UserProvider";
import { ErrorContext, createReporter } from "./ErrorCatcher";
import { signOut, setOnline } from "./services/firebase";
import Chat from "./components/Chat";

import "./App.scss";

function App() {
  const user = useContext(UserContext);
  const { dispatchError } = useContext(ErrorContext);
  useEffect(() => {
    const withDbReadReporter = createReporter(dispatchError, "read-database");
    withDbReadReporter(async () => {
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
