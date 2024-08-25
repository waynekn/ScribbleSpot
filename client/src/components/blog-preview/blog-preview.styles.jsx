import styled from "styled-components";
import { Link } from "react-router-dom";

export const BlogLink = styled(Link)`
  display: block;
  padding: 10px;
  margin: 10px 0;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  font-size: 1.5rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;
