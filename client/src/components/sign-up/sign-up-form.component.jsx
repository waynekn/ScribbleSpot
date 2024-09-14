import { useState } from "react";
import { Link } from "react-router-dom";
import { authenticateGoogleUser } from "../../api-requests/requests";
import PopoverForm from "../popover-form/popover-form.component";
import {
  SignUpPage,
  SignUpButtonsContainer,
  SignUpHeading,
  ProviderButtonsContainer,
  ProviderButton,
} from "./sign-up-form.styles";
const SignUpForm = () => {
  const [showPopoverForm, setShowPopoverForm] = useState(false);

  const handleEmailButtonClick = () => {
    setShowPopoverForm(true);
  };

  const handleClosePopover = () => {
    setShowPopoverForm(false);
  };

  return (
    <SignUpPage>
      <SignUpButtonsContainer>
        <SignUpHeading>Create an account with</SignUpHeading>
        <ProviderButtonsContainer>
          <ProviderButton onClick={() => authenticateGoogleUser("signup")}>
            Google
          </ProviderButton>
          <ProviderButton onClick={handleEmailButtonClick}>
            Email
          </ProviderButton>
        </ProviderButtonsContainer>
        <p>
          Already have an account?
          <Link to="../authentication/sign-in">Sign in</Link>
        </p>
      </SignUpButtonsContainer>
      {showPopoverForm && (
        <PopoverForm
          onClose={handleClosePopover}
          action="Sign up"
          provider={"Email"}
        />
      )}
    </SignUpPage>
  );
};
export default SignUpForm;
