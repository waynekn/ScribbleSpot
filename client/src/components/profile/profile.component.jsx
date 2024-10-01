import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import MessageToast from "../toast/toast.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { getImageUrl, signOutUser } from "../../api-requests/requests";
import { fetchUserProfile } from "../../store/profile/profile.slice";
import {
  clearCurrentUser,
  setCurrentUserNotificationMessage,
} from "../../store/user/user.slice";

import Spinner from "../spinner/spinner.component";

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
  const [isLoading, setIsLoading] = useState(true);

  const { userName } = useParams();
  const { titleSlug } = useParams();

  useEffect(() => {
    const getProfile = async (userName) => {
      try {
        /**
         * Pass the navigate function to fetchUserProfile so that if the user is not authenticated
         * it can call .navigate() to navigate them to authenticate themselves.
         */
        const fetchUserProfilePayload = {
          userName,
          navigate: () =>
            navigate("../../authentication/sign-in", { replace: true }),
        };

        const profileData = await dispatch(
          fetchUserProfile(fetchUserProfilePayload)
        ).unwrap();
        setProfile(profileData);
        setIsOwnAccount(currentUser?.userName === profileData.userName);

        const dateJoined = new Date(profileData.dateJoined);
        const formattedDate = `${String(dateJoined.getDate()).padStart(
          2,
          "0"
        )}/${String(dateJoined.getMonth()).padStart(
          2,
          "0"
        )}/${dateJoined.getFullYear()}`;
        setAccountAge(formattedDate);

        if (profileData.profilePicture && profileData.userName) {
          const { imageUrl } = await getImageUrl(
            profileData.profilePicture,
            profileData.userName
          );
          setImageUrl(imageUrl || "");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        return <p>Error fetching profile</p>;
      }
    };

    if (userName) {
      getProfile(userName);
    }
  }, [userName, dispatch, currentUser, navigate]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      dispatch(clearCurrentUser());
      navigate("/");
    } catch (error) {
      dispatch(setCurrentUserNotificationMessage("Couldnt sign out"));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <ProfilePageContainer>
      {/**
       * If the path has the param title slug it means the user is viewing
       * a blog thus the sidebar should not be displaid.
       */}
      {!titleSlug && (
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

      {currentUser.notificationMessage && (
        <MessageToast message={currentUser.notificationMessage} />
      )}
      <Main>
        <Outlet />
      </Main>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
