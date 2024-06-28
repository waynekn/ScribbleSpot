import Button from "react-bootstrap/Button";
import { URL } from "../../api-requests.js/requests";
//import { googleSignIn } from "../../api-requests.js/requests";

const SignInPage = () => {
  const handleClick = () => {
    window.location.href = `${URL}/auth/google`;
  };

  return (
    <Button variant="info" onClick={handleClick}>
      Sign in with Google
    </Button>
  );
};

export default SignInPage;
