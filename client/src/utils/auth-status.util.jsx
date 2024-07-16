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
          const currentUser = {
            email: profile.email,
            displayName: profile.displayName,
          };
          setCurrentUser(currentUser);
          navigate("/", { replace: true });
        } catch (error) {}
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
