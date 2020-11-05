import { useContext } from "react";

import { signInWithGoogle } from "../../services/firebase";
import { ErrorContext, createReporter } from "../../ErrorCatcher";
import ErrorListener from "../ErrorListener";

import googleLogo from "../../assets/google-logo.svg";
import "./Landing.scss";

const Landing = () => {
  const { dispatchError } = useContext(ErrorContext);
  const withLoginReporter = createReporter(dispatchError, "login");
  const tryGoogleSignin = withLoginReporter(signInWithGoogle);
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
      <button className="google-signin-button" onClick={tryGoogleSignin}>
        <img src={googleLogo} alt="google-logo" className="google-logo" />
        sign in with google
      </button>
      <ErrorListener domain="login" title="Login Error">
        Impossible to sign in. This is most likely due to a network error, so
        you should try again.
      </ErrorListener>
    </main>
  );
};

export default Landing;
