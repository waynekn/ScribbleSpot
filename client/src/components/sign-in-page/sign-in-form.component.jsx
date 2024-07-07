import { Link } from "react-router-dom";
import { URL } from "../../api-requests.js/requests";
import "./sign-in-form.styles.css";

const providers = [
  { name: "Google", id: "google" },
  { name: "Email and password", id: "local" },
];

const SignInForm = () => {
  const handleClick = (provider) => {
    window.location.href = `${URL}/auth/${provider}/signin`;
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
              onClick={() => handleClick(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          ))}
        </div>
        <p>
          Dont have an account?{" "}
          <Link to="../authentication/sign-up">Sign up</Link>
        </p>
      </section>
    </div>
  );
};

export default SignInForm;
