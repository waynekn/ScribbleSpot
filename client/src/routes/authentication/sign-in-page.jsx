import Button from "react-bootstrap/Button";
import { googleSignIn } from "../../api-requests.js/requests";
const SignInPage = () => {
  <Button variant="info" onClick={() => googleSignIn()}>
    Sign in with Google
  </Button>;
};
export default SignInPage;
