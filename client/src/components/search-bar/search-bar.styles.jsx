import styled from "styled-components";
import { Link } from "react-router-dom";

export const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  z-index: 2000;
  height: auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style-type: none;
  z-index: 3000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SuggestionCategory = styled.p`
  margin: 10px 0 5px;
  font-weight: bold;
  font-size: 14px;
  color: #555;
`;

export const SuggestionItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

export const SuggestionLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
`;
