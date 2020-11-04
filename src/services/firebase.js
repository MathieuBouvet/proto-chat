import dotenv from "dotenv";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

dotenv.config();

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();

const signInWithGoogle = async () => {
  return auth.signInWithPopup(googleProvider);
};

const signOut = async () => {
  await setOffline(auth.currentUser.uid);
  return auth.signOut();
};
const setOnline = async (user) => {
  const { email, name, avatar } = user;
  return db.ref("users/" + user.uid).set({ email, name, avatar, online: true });
};

const setOffline = async (uid) => {
  return db.ref("users/" + uid).update({ online: false });
};

export { auth, signInWithGoogle, signOut, db, setOnline };
