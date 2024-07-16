import { Link } from "react-router-dom";
import { authenticateUser } from "../../api-requests/requests";
import "./sign-up-form.styles.css";
const SignUpForm = () => {
  const providers = [
    { name: "Google", id: "google" },
    { name: "Email and password", id: "local" },
  ];

  return (
    <div className="sign-up-page">
      <section className="sign-up-buttons-container">
        <h2>Create an account with</h2>
        <div className="provider-buttons-container">
          {providers.map((provider) => (
            <button
              key={provider.id}
              className="provider-button"
              onClick={() => authenticateUser(provider.id, "signup")}
            >
              {provider.name}
            </button>
          ))}
        </div>
        <p>
          Already have an account?
          <Link to="../authentication/sign-in">Sign in</Link>
        </p>
      </section>
    </div>
  );
};
export default SignUpForm;
