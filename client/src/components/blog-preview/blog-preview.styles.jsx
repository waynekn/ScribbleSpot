import styled from "styled-components";
import { Link } from "react-router-dom";

export const DeleteBlogButton = styled.button`
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: 0;
  margin-left: 10px;
  display: flex;
  align-items: center;

  i {
    font-size: 1.5rem;
    color: ${({ disabled }) => (disabled ? "#a0a0a0" : "#050505")};
    transition: color 0.3s;

    &:hover {
      color: ${({ disabled }) => (disabled ? "#a0a0a0" : "#ff0000")};
    }
  }
`;

export const BlogLinkContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ${DeleteBlogButton} {
    display: none;
  }

  &:hover ${DeleteBlogButton} {
    display: flex;
  }
`;

export const BlogLink = styled(Link)`
  display: block;
  padding: 10px;
  margin: 0;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  font-size: 1.5rem;
  transition: background-color 0.3s, color 0.3s;
  flex-grow: 1;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;
