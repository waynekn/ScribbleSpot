import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import MessageToast from "../toast/toast.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { getImageUrl, signOutUser } from "../../api-requests/requests";
import {
  clearCurrentUser,
  updateCurrentUser,
} from "../../store/user/user.slice";

import "./profile.component.styles.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [accountAge, setAccountAge] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchImageUrl = async (imageKey) => {
      try {
        const res = await getImageUrl(imageKey);
        return res.data.imageUrl;
      } catch (error) {
        return "";
      }
    };

    const updateImageUrl = async () => {
      const url = await fetchImageUrl(currentUser.profilePicture);
      setImageUrl(url);
    };
    updateImageUrl();
  }, [currentUser]);

  useEffect(() => {
    const dateJoined = new Date(currentUser.dateJoined);
    const age = `${String(dateJoined.getDate()).padStart(2, "0")}/${String(
      dateJoined.getMonth()
    ).padStart(2, "0")}/${dateJoined.getFullYear()}`;
    setAccountAge(age);
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      dispatch(clearCurrentUser());
      navigate("/");
    } catch (error) {
      dispatch(updateCurrentUser({ error: "Couldnt sign out" }));
    }
  };

  return (
    <div className="profile-page">
      <aside className="sidebar">
        <img src={imageUrl} alt="profile" className="profile-pic" />
        <p className="display-name">{currentUser.displayName}</p>
        <p className="account-age">{accountAge}</p>
        <p className="email">{currentUser.email}</p>
        <Link to="posts">Posts</Link>
        <Link to="../editor" target="_blank">
          Editor
        </Link>
        <Link to="settings">Settings</Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </aside>

      {currentUser.error && <MessageToast message={currentUser.error} />}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfilePage;
