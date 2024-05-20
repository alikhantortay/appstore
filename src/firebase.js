import { Notify } from "notiflix/build/notiflix-notify-aio";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { addUser, removeUser } from "./redux/auth/slice";
import { makeErrorMessage } from "./makeErrorMessage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signUp = async (
  displayName,
  email,
  password,
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(user, { displayName });
    await sendEmailVerification(user);
    Notify.failure(
      "Email verification link sent to your email.",
    );
  } catch (error) {
    makeErrorMessage(error.code);
  }
};

export const logIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    !user.emailVerified &&
      makeErrorMessage("auth/not-verified");
  } catch (error) {
    makeErrorMessage(error.code);
  }
};

export const logInGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    makeErrorMessage(error.code);
  }
};

export const checkIsUserLoggedIn = (dispatch) =>
  onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
      dispatch(addUser(user));
    } else {
      dispatch(removeUser());
    }
  });

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    Notify.failure(
      "Password reset link sent to your email.",
    );
  } catch (error) {
    makeErrorMessage(error.code);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    makeErrorMessage(error.code);
  }
};
