import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useMatch, useParams } from "react-router-dom";
import MessageToast from "../toast/toast.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { getImageUrl, signOutUser } from "../../api-requests/requests";
import { fetchProfile } from "../../store/profile/profile.slice";
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
  UserName,
  Main,
} from "./profile.styles";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [accountAge, setAccountAge] = useState("");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [isOwnAccount, setIsOwnAccount] = useState(false);

  const isBlogRoute = useMatch("/profile/:userName/posts/:title");
  const { userName } = useParams();

  useEffect(() => {
    const getProfile = async (userName) => {
      dispatch(fetchProfile(userName))
        .unwrap()
        .then((profile) => {
          setProfile(profile);
          setIsOwnAccount(currentUser.userName === profile.userName);
        })
        .catch(() => {
          return <p>Error getting profile</p>;
        });
    };
    getProfile(userName);
  }, [userName, dispatch]);

  useEffect(() => {
    const fetchImageUrl = async (imageKey, userName) => {
      try {
        const { imageUrl } = await getImageUrl(imageKey, userName);
        return imageUrl;
      } catch (error) {
        return "";
      }
    };

    const updateImageUrl = async () => {
      if (profile.profilePicture && profile.userName) {
        const url = await fetchImageUrl(
          profile.profilePicture,
          profile.userName
        );
        setImageUrl(url);
      }
    };
    updateImageUrl();
  }, [profile]);

  useEffect(() => {
    const dateJoined = new Date(profile.dateJoined);
    const age = `${String(dateJoined.getDate()).padStart(2, "0")}/${String(
      dateJoined.getMonth()
    ).padStart(2, "0")}/${dateJoined.getFullYear()}`;
    setAccountAge(age);
  }, [profile]);

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
      {!isBlogRoute && (
        <SideBar>
          <ProfilePicture src={imageUrl} alt="profile" />
          <UserName>{profile.userName}</UserName>
          <Paragraph>{accountAge}</Paragraph>
          <SidebarLink to="posts">Posts</SidebarLink>
          {isOwnAccount && (
            <>
              <SidebarLink to="../editor" target="_blank">
                Editor
              </SidebarLink>
              <SidebarLink to="settings">Settings</SidebarLink>
              <SidebarButton onClick={handleSignOut}>Sign Out</SidebarButton>
            </>
          )}
        </SideBar>
      )}

      {currentUser.error && <MessageToast message={currentUser.error} />}
      <Main>
        <Outlet />
      </Main>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
