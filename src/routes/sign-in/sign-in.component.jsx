import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(async () => {
    const res = await getRedirectResult(auth);
    if (res) {
      const userDocRef = await createUserDocumentFromAuth(res.user);
    }
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign In with Google pop up</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In with Google redirect
      </button>
    </div>
  );
};

export default SignIn;
