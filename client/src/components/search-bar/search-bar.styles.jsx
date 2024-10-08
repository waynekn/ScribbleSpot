import styled from "styled-components";
import { Link } from "react-router-dom";
export const SearchContainer = styled.div`
  position: fixed;
  top: 5px;
  left: 40%;
  transform: translateX(-50%);
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  z-index: 2000;
  height: auto;
  @media (max-width: 768px) {
    left: 50%;
    max-width: 300px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #333;
  border-radius: 25px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #000;
    outline: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
`;

export const SuggestionWrapper = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #333;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const SuggestionsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  z-index: 3000;
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
`;

export const SuggestionCategory = styled.p`
  margin: 10px 0 5px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  padding-left: 15px;
`;

export const SuggestionItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f1f1f1;
  }

  &:active {
    background: #e9ecef;
  }
`;

export const SuggestionLink = styled(Link)`
  text-decoration: none;
  color: #000;
  display: block;
`;
