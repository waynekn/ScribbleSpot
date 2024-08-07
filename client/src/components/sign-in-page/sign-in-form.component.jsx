import { Link } from "react-router-dom";
import MessageToast from "../toast/toast.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { authenticateUser } from "../../api-requests/requests";

import "./sign-in-form.styles.css";

const providers = [
  { name: "Google", id: "google" },
  { name: "Email and password", id: "local" },
];

const SignInForm = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="sign-in-page">
      <section className="sign-in-buttons-container">
        <h2>Sign in to Your Account</h2>
        <div className="provider-buttons-container">
          {providers.map((provider) => (
            <button
              key={provider.id}
              className="provider-button"
              onClick={() => authenticateUser(provider.id, "signin")}
            >
              Sign in with {provider.name}
            </button>
          ))}
        </div>
        <p>
          Don't have an account?
          <Link to="../authentication/sign-up">Sign up</Link>
        </p>
      </section>
      {currentUser.error && (
        <div className="toast-container">
          <MessageToast
            className="toast-container"
            message={currentUser.error}
          />
        </div>
      )}
    </div>
  );
};

export default SignInForm;
