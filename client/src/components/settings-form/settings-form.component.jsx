import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { uploadSettingsForm } from "../../api-requests/requests";
import { getImageUrl } from "../../api-requests/requests";

import "./settings-form.component.styles.css";

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
    <div className="form-container">
      <form
        ref={formRef}
        className="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="displayName">User name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={currentUser.displayName}
            className="form-input"
          />
          {errorMessage.length > 0 && (
            <p className="error-message">{errorMessage}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={currentUser.email}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="profile-picture">Change profile picture</label>
          <input
            type="file"
            id="profile-picture"
            name="profile-picture"
            accept="image/*"
            className="file-input"
          />
          <img src={imageUrl} alt="Profile" className="profile-picture" />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SettingsForm;
