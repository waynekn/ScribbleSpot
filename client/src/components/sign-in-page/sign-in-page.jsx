import { URL } from "../../api-requests.js/requests";
import "./sign-in-page.styles.css";

const providers = [
  { name: "Google", id: "google" },
  { name: "Facebook", id: "facebook" },
  { name: "Twitter", id: "twitter" },
];

const SignInPage = () => {
  const handleClick = (provider) => {
    window.location.href = `${URL}/auth/${provider}`;
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
      </section>
    </div>
  );
};

export default SignInPage;
