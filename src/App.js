import { useEffect } from "react";
import Topbar from "./components/Topbar";
import Landing from "./components/Landing";
import UserProvider, { UserContext } from "./UserProvider";
import { signOut } from "./services/firebase";
import Chat from "./components/Chat";

import "./App.scss";

function App() {
  useEffect(() => {
    const beforeUnload = async () => {
      await signOut();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <div className="App">
            <Topbar />
            {!user ? <Landing /> : <Chat />}
          </div>
        )}
      </UserContext.Consumer>
    </UserProvider>
  );
}

export default App;
