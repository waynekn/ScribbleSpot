import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  clearCurrentUser,
  updateCurrentUser,
} from "../../store/user/user.slice";
import { signOutUser, getImageUrl } from "../../api-requests/requests";
import {
  DropDownContainer,
  DropDownContent,
  DropDownLink,
  DropDownButton,
  ProfilePicture,
} from "./dropdown.styles";

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
    <DropDownContainer>
      <ProfilePicture src={imageUrl} alt="Profile" />
      <DropDownContent>
        <DropDownLink to="profile">View profile</DropDownLink>
        <DropDownLink to="settings">Settings</DropDownLink>
        <DropDownButton onClick={handleSignOut}>Sign Out</DropDownButton>
      </DropDownContent>
    </DropDownContainer>
  );
};

export default DropDown;
