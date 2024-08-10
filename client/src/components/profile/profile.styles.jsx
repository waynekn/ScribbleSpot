import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProfilePageContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

export const SidebarLink = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const SidebarButton = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const SideBar = styled.aside`
  height: 100%;
  width: 15%;
  background-color: #f9f9f9;
  border-right: 2px solid hsl(0, 0%, 50%);
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
`;

export const ProfilePicture = styled.img`
  height: 200px;
  width: 90%;
  border-radius: 30%;
  object-fit: cover;
`;

export const DisplayName = styled.p`
  margin: 5px 0;
  color: hsla(0, 92%, 5%, 0.664);
  font-weight: bold;
`;

export const Paragraph = styled.p`
  margin: 5px 0;
  color: hsla(0, 0%, 50%, 0.719);
  font-style: italic;
`;

export const Main = styled.main`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
`;
