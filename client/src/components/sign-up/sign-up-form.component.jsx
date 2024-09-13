import { Link } from "react-router-dom";
import { authenticateGoogleUser } from "../../api-requests/requests";
import {
  SignUpPage,
  SignUpButtonsContainer,
  SignUpHeading,
  ProviderButtonsContainer,
  ProviderButton,
} from "./sign-up-form.styles";
const SignUpForm = () => {
  return (
    <SignUpPage>
      <SignUpButtonsContainer>
        <SignUpHeading>Create an account with</SignUpHeading>
        <ProviderButtonsContainer>
          <ProviderButton onClick={() => authenticateGoogleUser("signup")}>
            Google
          </ProviderButton>
          <ProviderButton>Email</ProviderButton>
        </ProviderButtonsContainer>
        <p>
          Already have an account?
          <Link to="../authentication/sign-in">Sign in</Link>
        </p>
      </SignUpButtonsContainer>
    </SignUpPage>
  );
};
export default SignUpForm;
