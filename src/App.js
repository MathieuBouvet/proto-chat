import { useEffect, useContext } from "react";
import Topbar from "./components/Topbar";
import Landing from "./components/Landing";
import { UserContext } from "./UserProvider";
import { signOut } from "./services/firebase";
import Chat from "./components/Chat";

import "./App.scss";

function App() {
  const user = useContext(UserContext);
  useEffect(() => {
    const beforeUnload = async () => {
      await signOut();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);
  return (
    <div className="App">
      <Topbar />
      {!user ? <Landing /> : <Chat />}
    </div>
  );
}

export default App;
