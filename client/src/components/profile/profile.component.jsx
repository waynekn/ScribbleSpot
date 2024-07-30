import { useRef, useState } from "react";
import axios from "axios";
import "./profile.component.styles.css";
const Profile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef();

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
      await axios.post("http://localhost:8000/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      setErrorMessage(error.message);
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
          <label htmlFor="displayName">Enter your name</label>
          <input type="text" name="displayName" id="displayName" />
          {errorMessage.length > 0 && (
            <p className="error-message">{errorMessage}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="profile-picture">Change profile picture</label>
          <input type="file" id="profile-picture" name="profile-picture" />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
