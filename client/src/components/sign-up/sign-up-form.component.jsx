import { Link } from "react-router-dom";
import { authenticateUser } from "../../api-requests/requests";
import {
  SignUpPage,
  SignUpButtonsContainer,
  SignUpHeading,
  ProviderButtonsContainer,
  ProviderButton,
} from "./sign-up-form.styles";
const SignUpForm = () => {
  const providers = [
    { name: "Google", id: "google" },
    { name: "Email and password", id: "local" },
  ];

  return (
    <SignUpPage>
      <SignUpButtonsContainer>
        <SignUpHeading>Create an account with</SignUpHeading>
        <ProviderButtonsContainer>
          {providers.map((provider) => (
            <ProviderButton
              key={provider.id}
              onClick={() => authenticateUser(provider.id, "signup")}
            >
              {provider.name}
            </ProviderButton>
          ))}
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
