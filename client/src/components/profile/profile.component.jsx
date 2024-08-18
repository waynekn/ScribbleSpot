import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import MessageToast from "../toast/toast.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { getImageUrl, signOutUser } from "../../api-requests/requests";
import {
  clearCurrentUser,
  updateCurrentUser,
} from "../../store/user/user.slice";

import {
  ProfilePageContainer,
  ProfilePicture,
  SideBar,
  SidebarButton,
  SidebarLink,
  Paragraph,
  DisplayName,
  Main,
} from "./profile.styles";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [accountAge, setAccountAge] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchImageUrl = async (imageKey) => {
      try {
        const { imageUrl } = await getImageUrl(imageKey);
        return imageUrl;
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
    <ProfilePageContainer>
      <SideBar>
        <ProfilePicture src={imageUrl} alt="profile" />
        <DisplayName>{currentUser.displayName}</DisplayName>
        <Paragraph>{accountAge}</Paragraph>
        <Paragraph>{currentUser.email}</Paragraph>
        <SidebarLink to="posts">Posts</SidebarLink>
        <SidebarLink to="../editor" target="_blank">
          Editor
        </SidebarLink>
        <SidebarLink to="settings">Settings</SidebarLink>
        <SidebarButton onClick={handleSignOut}>Sign Out</SidebarButton>
      </SideBar>

      {currentUser.error && <MessageToast message={currentUser.error} />}
      <Main>
        <Outlet />
      </Main>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
