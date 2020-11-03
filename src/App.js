import "./App.scss";
import Topbar from "./components/Topbar";
import Landing from "./components/Landing";
import UserProvider, { UserContext } from "./UserProvider";

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
