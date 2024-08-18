import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../store/user/user.slice";

const AuthStatus = () => {
  const dispatch = useDispatch();
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const handleAuthStatus = async () => {
      if (status === "success") {
        dispatch(fetchCurrentUser())
          .unwrap()
          .then(() => {
            navigate("/", { replace: true });
          })
          .catch((error) => {
            console.log(error);
            navigate("/authentication/sign-in", { replace: true });
          });
      } else {
        navigate("/authentication/sign-in", {
          replace: true,
        });
      }
    };

    handleAuthStatus();
  });

  return null;
};

export default AuthStatus;
