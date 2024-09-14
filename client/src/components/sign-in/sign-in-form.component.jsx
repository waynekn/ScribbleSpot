import { useState } from "react";
import { Link } from "react-router-dom";
import MessageToast from "../toast/toast.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { authenticateGoogleUser } from "../../api-requests/requests";
import PopoverForm from "../popover-form/popover-form.component";

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
  const [showPopoverForm, setShowPopoverForm] = useState(false);

  const handleEmailButtonClick = () => {
    setShowPopoverForm(true);
  };

  const handleClosePopover = () => {
    setShowPopoverForm(false);
  };

  return (
    <SignInPage>
      <SignInButtonsContainer>
        <SignInHeading>Sign in to Your Account</SignInHeading>
        <ProviderButtonsContainer>
          <ProviderButton onClick={() => authenticateGoogleUser("signin")}>
            Sign in with Google
          </ProviderButton>
          <ProviderButton onClick={handleEmailButtonClick}>
            Username or Email
          </ProviderButton>
        </ProviderButtonsContainer>
        <p>
          Don't have an account?
          <Link to="../authentication/sign-up">Sign up</Link>
        </p>
      </SignInButtonsContainer>
      {showPopoverForm && (
        <PopoverForm
          onClose={handleClosePopover}
          action="Sign in"
          provider={"Username or Email"}
        />
      )}
      {currentUser.notificationMessage && (
        <ToastContainer>
          <MessageToast message={currentUser.notificationMessage} />
        </ToastContainer>
      )}
    </SignInPage>
  );
};

export default SignInForm;
