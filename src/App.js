import Topbar from "./components/Topbar";
import Landing from "./components/Landing";
import UserProvider, { UserContext } from "./UserProvider";

import "./App.scss";

function App() {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <div className="App">
            <Topbar />
            {!user ? <Landing /> : "logged in"}
          </div>
        )}
      </UserContext.Consumer>
    </UserProvider>
  );
}

export default App;
