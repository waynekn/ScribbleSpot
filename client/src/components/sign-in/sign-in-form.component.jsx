import { Link } from "react-router-dom";
import MessageToast from "../toast/toast.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { authenticateGoogleUser } from "../../api-requests/requests";

import {
  SignInPage,
  SignInHeading,
  SignInButtonsContainer,
  ProviderButtonsContainer,
  ProviderButton,
  ToastContainer,
} from "./sign-in-form.styles";

const SignInForm = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <SignInPage>
      <SignInButtonsContainer>
        <SignInHeading>Sign in to Your Account</SignInHeading>
        <ProviderButtonsContainer>
          <ProviderButton
            onClick={() => authenticateGoogleUser("google", "signin")}
          >
            Sign in with Google
          </ProviderButton>
          <ProviderButton>Sign in with email</ProviderButton>
        </ProviderButtonsContainer>
        <p>
          Don't have an account?
          <Link to="../authentication/sign-up">Sign up</Link>
        </p>
      </SignInButtonsContainer>
      {currentUser.error && (
        <ToastContainer>
          <MessageToast message={currentUser.error} />
        </ToastContainer>
      )}
    </SignInPage>
  );
};

export default SignInForm;
