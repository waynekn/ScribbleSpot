import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  authenticateLocalUser,
  setCurrentUserNotificationMessage,
} from "../../store/user/user.slice";
import {
  Backdrop,
  PopoverContainer,
  CloseButton,
  FormField,
  ErrorMessage,
  Input,
  Button,
  EyeIcon,
} from "./popover-form.styles";

const PopoverForm = ({ onClose, action, provider }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const isSignInAction = action === "Sign in";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * This regex matches a typical email address format:
   * - Starts with one or more alphanumeric characters or dots (e.g., `user.name`).
   * - Followed by an `@` symbol.
   * - Followed by one or more alphanumeric characters or hyphens, ending with a dot (e.g., `example.`).
   * - Ends with a domain part consisting of 2 to 4 alphanumeric characters (e.g., `com`, `org`, `info`).
   */
  const emailRegex = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  //Username must be 6-16 alphanumeric characters
  const userNameRegex = /^[0-9A-Za-z]{6,16}$/g;
  //Password must be at least 8 characters long and include a number, an uppercase and a lowercase letter
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validateForm = () => {
    const newErrors = {};

    if (isSignInAction) {
      //For sign in email input field is not displaid so the userName field can have an email or username
      const emailOrUserName = formValues.userName;
      const isValidUserName = userNameRegex.test(emailOrUserName);
      const isValidEmail = emailRegex.test(emailOrUserName);

      if (!isValidEmail && !isValidUserName) {
        newErrors.userName = "Enter a valid username or email";
      }

      if (!passwordRegex.test(formValues.password)) {
        newErrors.password =
          "Password must be at least 8 characters long and include a number, an uppercase and a lowercase letter";
      }
    } else {
      if (!emailRegex.test(formValues.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!userNameRegex.test(formValues.userName)) {
        newErrors.userName = "Username must be 6-16 alphanumeric characters";
      }

      if (!passwordRegex.test(formValues.password)) {
        newErrors.password =
          "Password must be at least 8 characters long and include a number, an uppercase and a lowercase letter";
      }

      if (formValues.password !== formValues.confirmPassword) {
        newErrors.confirmPassword = "Password did not match";
      }
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      /**
       * Convert the action, 'Sign in' or 'Sign up' to 'signin' or 'signup'
       * this is only used to determine which server route to make a request to
       * and will not be sent along with the other formValues keys to the server
       */
      formValues.action = action.toLowerCase().split(" ").join("");
      if (isSignInAction) {
        const signInUser = {
          ...formValues,
          emailOrUserName: formValues.userName,
        };
        delete signInUser.userName;
        delete signInUser.email;
        delete signInUser.confirmPassword;
        dispatch(authenticateLocalUser(signInUser))
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((ErrorMessage) => {
            setCurrentUserNotificationMessage(ErrorMessage);
          });
      } else {
        const signUpUser = { ...formValues };
        delete signUpUser.confirmPassword;
        dispatch(authenticateLocalUser(signUpUser))
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((ErrorMessage) => {
            setCurrentUserNotificationMessage(ErrorMessage);
          });
      }
    }
  };

  return (
    <Backdrop>
      <PopoverContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {/**
         * Action is either 'Sign in' or 'Sign up' from sign in page and
         * sign up page respectively
         *
         * Provider is either 'Username or Email' or 'Email' from sign in page
         * and sign up page respectively
         */}
        <h3>{`${action} with ${provider}`}</h3>
        <form onSubmit={handleFormSubmit}>
          {!isSignInAction && (
            <FormField>
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <ErrorMessage>{formErrors.email}</ErrorMessage>
              )}
            </FormField>
          )}
          <FormField>
            <label>Username {isSignInAction && "or Email"}</label>
            <Input
              type="text"
              name="userName"
              value={formValues.userName}
              onChange={handleChange}
            />
            {formErrors.userName && (
              <ErrorMessage>{formErrors.userName}</ErrorMessage>
            )}
          </FormField>
          <FormField>
            <label>Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <EyeIcon
              className={`bi bi-eye${showPassword ? "-slash" : ""}`}
              onClick={togglePasswordVisibility}
            />
            {formErrors.password && (
              <ErrorMessage>{formErrors.password}</ErrorMessage>
            )}
          </FormField>
          {!isSignInAction && (
            <FormField>
              <label>Confirm Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              <EyeIcon
                className={`bi bi-eye${showPassword ? "-slash" : ""}`}
                onClick={togglePasswordVisibility}
              />
              {formErrors.confirmPassword && (
                <ErrorMessage>{formErrors.confirmPassword}</ErrorMessage>
              )}
            </FormField>
          )}
          <Button type="submit" disabled={currentUser.isLoading}>
            {action}
          </Button>
        </form>
      </PopoverContainer>
    </Backdrop>
  );
};

PopoverForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  action: PropTypes.string,
  provider: PropTypes.string,
};

export default PopoverForm;
