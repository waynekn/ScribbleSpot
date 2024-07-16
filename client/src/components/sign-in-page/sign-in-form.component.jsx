import { Link, useLocation } from "react-router-dom";
import MessageToast from "../toast/toast.component";
import { authenticateUser } from "../../api-requests/requests";

import "./sign-in-form.styles.css";

const providers = [
  { name: "Google", id: "google" },
  { name: "Email and password", id: "local" },
];

const SignInForm = () => {
  const location = useLocation();
  const message = location?.state?.message;

  const getTime = () => {
    const date = new Date(Date.now());
    const displayTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return displayTime;
  };

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
      {message && (
        <div className="toast-container">
          <MessageToast
            className="toast-container"
            time={getTime()}
            message={message}
          />
        </div>
      )}
    </div>
  );
};

export default SignInForm;
