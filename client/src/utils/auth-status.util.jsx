import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AuthStatus = () => {
  const { status, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success" && token) {
      localStorage.setItem("ssToken", token);
      navigate("/", { replace: true });
    } else {
      navigate("/authentication/sign-in", {
        replace: true,
        state: { message: "Wrong username or password" },
      });
    }
  }, [status, navigate]);

  return (
    <h1>
      {status} {token}
    </h1>
  );
};

export default AuthStatus;
