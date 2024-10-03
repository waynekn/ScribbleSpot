import { useState, useRef } from "react";
import { getUserSuggestions } from "../../api-requests/requests";

import {
  SearchContainer,
  SearchInput,
  SuggestionsList,
  SuggestionItem,
  SuggestionLink,
} from "./search-bar.styles";

const SearchBar = () => {
  const [searchProfile, setSearchProfile] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const hasInputText = useRef(false);

  const handleChange = async (e) => {
    const userName = e.target.value;
    setSearchProfile(userName);

    if (userName) {
      hasInputText.current = true;
      const suggestedUsers = await getUserSuggestions(userName);

      if (hasInputText.current) {
        setSuggestedUsers(suggestedUsers);
      }
    } else {
      hasInputText.current = false;
      setSuggestedUsers([]);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for a user"
        value={searchProfile}
        onChange={handleChange}
      />
      {suggestedUsers.length > 0 && (
        <SuggestionsList>
          {suggestedUsers.map((username, index) => (
            <SuggestionItem key={index}>
              <SuggestionLink to={`profile/${username}`}>
                {username}
              </SuggestionLink>
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
