import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  clearCurrentUser,
  updateCurrentUser,
} from "../../store/user/user.slice";
import { signOutUser, getImageUrl } from "../../api-requests/requests";
import "./dropdown.component.styles.css";

const DropDown = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const updateImageUrl = async (imageKey) => {
      try {
        const res = await getImageUrl(imageKey);
        return res.data.imageUrl;
      } catch (error) {
        console.warn(error);
        return "";
      }
    };

    const fetchImageUrl = async () => {
      if (currentUser && currentUser.profilePicture) {
        const url = await updateImageUrl(currentUser.profilePicture);
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      dispatch(clearCurrentUser());
    } catch (error) {
      dispatch(updateCurrentUser({ error: "Couldnt sign out" }));
    }
  };

  return (
    <div className="dropdown">
      <img className="profile-picture" src={imageUrl} alt="Profile" />
      <div className="dropdown-content">
        <Link to="profile">View profile</Link>
        <Link to="settings">Settings</Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default DropDown;
