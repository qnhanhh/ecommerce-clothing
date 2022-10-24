import { useState, FormEvent, ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

import { userState } from "../../recoil/user/user.state";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { signUp } from "../../recoil/user/user.actions";
import { UserData } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const setState = useSetRecoilState(userState);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

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

  const signUpStart = async () => {
    try {
      const user = await signUp(email, password, displayName);
      setState((prevState) => {
        return { ...prevState, currentUser: user as UserData };
      });
    } catch (error) {
      setState((prevState) => {
        return { ...prevState, error: error as Error };
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      signUpStart();
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error: ", error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button children="Sign Up" type="submit" />
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
