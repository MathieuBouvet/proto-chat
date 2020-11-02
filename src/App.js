import "./App.scss";
import googleLogo from "./assets/google-logo.svg";

import { signInWithGoogle } from "./services/firebase";

function App() {
  return (
    <div className="App">
      <header className="app-header">proto-chat</header>
      <main className="app-content">
        <h1>Welcome to proto-chat !</h1>
        <p>
          It is a tiny chat app built to test google{" "}
          <a
            href="https://firebase.google.com/"
            target="blank"
            rel="noreferrer noopener"
          >
            firebase
          </a>
        </p>
        <p>
          Sign in using a google account to start chatting with everyone using
          this app. <small>That means not a lot of people actually 😉</small>
        </p>
        <button className="google-signin-button" onClick={signInWithGoogle}>
          <img src={googleLogo} alt="google-logo" className="google-logo" />
          sign in with google
        </button>
      </main>
    </div>
  );
}

export default App;
