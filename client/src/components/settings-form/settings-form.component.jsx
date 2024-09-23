import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { uploadSettingsForm, getImageUrl } from "../../api-requests/requests";
import Spinner from "../spinner/spinner.component";

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
  const [isLoading, setIsloading] = useState(true);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const formRef = useRef();

  const { userName } = useParams();

  /**
   * Whilst the UI ensures that the link to this page is not shown
   * to someone who is not viewing their own profile, nothing prevents
   * a user from typing in the URL directly so this effect redirects them to
   * authenticate themselves if they try to access another users settings.
   */
  useEffect(() => {
    if (!currentUser || currentUser.userName !== userName) {
      navigate("/authentication/sign-in");
      setIsloading(false);
    } else {
      setIsloading(false);
    }
  }, [currentUser, userName, navigate]);

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
      const res = await fetchImageUrl(currentUser.profilePicture);
      setImageUrl(res);
    };
    updateImageUrl();
  }, [currentUser]);

  if (isLoading) return <Spinner />;

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
    const userName = formData.get("userName");
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
          <FormLabel htmlFor="userName">User name</FormLabel>
          <FormInput
            type="text"
            name="userName"
            id="userName"
            value={currentUser.userName}
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
