import { useState } from "react";

import { signInWithGoogle } from "../../services/firebase";

import googleLogo from "../../assets/google-logo.svg";
import "./Landing.scss";

const Landing = () => {
  const [hasLoginError, setHasLoginError] = useState(false);
  const tryLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      setHasLoginError(false);
    } catch (error) {
      setHasLoginError(true);
    }
  };
  return (
    <main className="Landing">
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
      <button className="google-signin-button" onClick={tryLoginWithGoogle}>
        <img src={googleLogo} alt="google-logo" className="google-logo" />
        sign in with google
      </button>
      {hasLoginError && <div>Erreur lors de la tentative de connexion</div>}
    </main>
  );
};

export default Landing;
