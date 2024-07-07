import { Link } from "react-router-dom";
import { URL } from "../../api-requests.js/requests";
import "./sign-up-form.styles.css";
const SignUpForm = () => {
  const providers = [
    { name: "Google", id: "google" },
    { name: "Email and password", id: "local" },
  ];
  const handleClick = (provider) => {
    window.location.href = `${URL}/auth/${provider}/signup`;
  };

  return (
    <div className="sign-up-page">
      <section className="sign-up-buttons-container">
        <h2>Create an account with</h2>
        <div className="provider-buttons-container">
          {providers.map((provider) => (
            <button
              key={provider.id}
              className="provider-button"
              onClick={() => handleClick(provider.id)}
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
