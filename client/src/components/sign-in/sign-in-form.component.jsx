import { Link } from "react-router-dom";
import MessageToast from "../toast/toast.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { authenticateUser } from "../../api-requests/requests";

import {
  SignInPage,
  SignInHeading,
  SignInButtonsContainer,
  ProviderButtonsContainer,
  ProviderButton,
  ToastContainer,
} from "./sign-in-form.styles";

const providers = [
  { name: "Google", id: "google" },
  { name: "Email and password", id: "local" },
];

const SignInForm = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <SignInPage>
      <SignInButtonsContainer>
        <SignInHeading>Sign in to Your Account</SignInHeading>
        <ProviderButtonsContainer>
          {providers.map((provider) => (
            <ProviderButton
              key={provider.id}
              onClick={() => authenticateUser(provider.id, "signin")}
            >
              Sign in with {provider.name}
            </ProviderButton>
          ))}
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
