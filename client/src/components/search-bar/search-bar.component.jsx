import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchProfile, setSearchProfile] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const string = e.target.value;
    setSearchProfile(string);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = searchProfile.trim();
    navigate(`profile/${profile}`);
    setSearchProfile("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a user"
        value={searchProfile}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
