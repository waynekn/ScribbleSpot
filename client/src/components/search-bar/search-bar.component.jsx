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
  const [suggestions, setSuggestions] = useState([]);
  const hasInputText = useRef(false);

  const handleChange = async (e) => {
    const userName = e.target.value;
    setSearchProfile(userName);

    if (userName) {
      hasInputText.current = true;
      const suggestions = await getUserSuggestions(userName);

      if (hasInputText.current) {
        setSuggestions(suggestions);
      }
    } else {
      hasInputText.current = false;
      setSuggestions([]);
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
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((username, index) => (
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
