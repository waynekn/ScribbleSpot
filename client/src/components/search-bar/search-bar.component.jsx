import { useState, useRef } from "react";
import {
  getUserSuggestions,
  getBlogSuggestions,
} from "../../api-requests/requests";

import {
  SearchContainer,
  SearchInput,
  SuggestionCategory,
  SuggestionsList,
  SuggestionItem,
  SuggestionLink,
  SuggestionWrapper,
} from "./search-bar.styles";

const SearchBar = () => {
  const [searchSearchBarValue, setSearchBarValue] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const hasInputText = useRef(false);

  const handleChange = async (e) => {
    const searchString = e.target.value;
    setSearchBarValue(searchString);
    const trimmedSearchString = searchString.trim();

    const hasSearchString = searchString.replace(/\s/g, "");

    if (hasSearchString) {
      hasInputText.current = true;

      const usersPromise = getUserSuggestions(trimmedSearchString);
      const blogsPromise = getBlogSuggestions(trimmedSearchString);

      const [suggestedUsers, suggestedBlogs] = await Promise.all([
        usersPromise,
        blogsPromise,
      ]);

      if (hasInputText.current) {
        setSuggestedUsers(suggestedUsers);
        setSuggestedBlogs(suggestedBlogs);
      }
    } else {
      hasInputText.current = false;
      setSuggestedUsers([]);
      setSuggestedBlogs([]);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for users or blogs"
        value={searchSearchBarValue}
        onChange={handleChange}
      />

      {(suggestedUsers.length > 0 || suggestedBlogs.length > 0) && (
        <SuggestionWrapper>
          {suggestedUsers.length > 0 && (
            <div>
              <SuggestionCategory>Users</SuggestionCategory>
              <SuggestionsList>
                {suggestedUsers.map((username, index) => (
                  <SuggestionItem key={index}>
                    <SuggestionLink to={`profile/${username}`}>
                      {username}
                    </SuggestionLink>
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            </div>
          )}
          {suggestedBlogs.length > 0 && (
            <div>
              <SuggestionCategory>Blogs</SuggestionCategory>
              <SuggestionsList>
                {suggestedBlogs.map((blogSuggestion, index) => (
                  <SuggestionItem key={index}>
                    <SuggestionLink
                      to={`blog/${blogSuggestion.titleSlug}/${blogSuggestion.id}`}
                    >
                      {blogSuggestion.title}
                    </SuggestionLink>
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            </div>
          )}
        </SuggestionWrapper>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
