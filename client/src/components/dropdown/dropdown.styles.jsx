import styled from "styled-components";
import { Link } from "react-router-dom";

export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: block;
`;

export const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${DropDownContent} {
    display: block;
  }

  &:hover ${ProfilePicture} {
    filter: brightness(0.9);
  }
`;

export const DropDownLink = styled(Link)`
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

export const DropDownButton = styled.button`
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

  &:focus {
    outline: none;
  }
`;
