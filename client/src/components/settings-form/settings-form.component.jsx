import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { uploadSettingsForm } from "../../api-requests/requests";
import { getImageUrl } from "../../api-requests/requests";

import {
  FormContainer,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FileInput,
  ProfilePicture,
  SubmitButton,
  ErrorMessage,
} from "./settings-form.styles";

const SettingsForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const formRef = useRef();

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
      const res = await fetchImageUrl(currentUser.profilePicture);
      setImageUrl(res);
    };
    updateImageUrl();
  }, [currentUser]);

  const validateUserName = (userName) => {
    if (!userName.trim()) {
      throw new Error("Username cant be empty");
    }
    if (userName.length < 3) {
      throw new Error("Username must be at least 3 characters ");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    setErrorMessage("");

    const formData = new FormData(form);
    const userName = formData.get("displayName");
    try {
      if (userName) validateUserName(userName);
      await uploadSettingsForm(formData);
    } catch (error) {
      console.warn(error);
      if (error.status === 403 || error.status === 401) {
        navigate("authentication/sign-in");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <FormContainer>
      <Form ref={formRef} encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="displayName">User name</FormLabel>
          <FormInput
            type="text"
            name="displayName"
            id="displayName"
            value={currentUser.displayName}
          />
          {errorMessage.length > 0 && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            name="email"
            id="email"
            value={currentUser.email}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="profile-picture">
            Change profile picture
          </FormLabel>
          <FileInput
            type="file"
            id="profile-picture"
            name="profile-picture"
            accept="image/*"
          />
          <ProfilePicture src={imageUrl} alt="Profile" />
        </FormGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default SettingsForm;
