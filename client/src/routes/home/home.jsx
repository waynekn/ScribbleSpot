import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../../store/user/user.slice";
import { checkAuthStatus } from "../../api-requests/requests";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        dispatch(clearCurrentUser());
      }
    };
    getAuthStatus();
  });

  return (
    <>
      <h1>Welcome to ScribbleSpot</h1>
      <p> Explore in Beta</p>
    </>
  );
};
export default Home;
