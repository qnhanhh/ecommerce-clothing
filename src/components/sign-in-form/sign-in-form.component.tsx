import { useState, FormEvent, ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

import { userState } from "../../recoil/user/user.state";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ButtonContainer, SignInContainer } from "./sign-in-form.styles";
import {
  signInWithGoogle,
  signInWithEmail,
} from "../../recoil/user/user.actions";
import { UserData } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const setState = useSetRecoilState(userState);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailSignIn();
    resetFormFields();
  };

  const emailSignIn = async () => {
    try {
      const user = await signInWithEmail(email, password);
      setState((prevState) => {
        return { ...prevState, currentUser: user as UserData };
      });
    } catch (error) {
      setState((prevState) => {
        return { ...prevState, error: error as Error };
      });
    }
  };

  const googleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      setState((prevState) => {
        return { ...prevState, currentUser: user as UserData };
      });
    } catch (error) {
      setState((prevState) => {
        return { ...prevState, error: error as Error };
      });
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account ?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonContainer>
          <Button children="Sign In" type="submit" />
          <Button
            type="button"
            children="Google Sign In"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={googleSignIn}
          />
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
