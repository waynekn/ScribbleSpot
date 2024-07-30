import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/user.context";
import { getUserProfile } from "../api-requests/requests";

const AuthStatus = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const handleAuthStatus = async () => {
      if (status === "success") {
        try {
          const profile = await getUserProfile();
          setCurrentUser(profile);
          navigate("/", { replace: true });
        } catch (error) {
          navigate("/", { replace: true });
        }
      } else {
        navigate("/authentication/sign-in", {
          replace: true,
          state: { message: "Wrong username or password" },
        });
      }
    };

    handleAuthStatus();
  }, [status, navigate, setCurrentUser]);

  return null;
};

export default AuthStatus;
