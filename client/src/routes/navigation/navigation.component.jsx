import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button from "react-bootstrap/Button";
import DropDown from "../../components/dropdown/dropdown.component";
import SearchBar from "../../components/search-bar/search-bar.component";

import {
  Nav,
  NavLink,
  SearchWrapper,
  ButtonWrapper,
} from "./navigation.styles";
const NavBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <>
      <Nav>
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>
        <ButtonWrapper>
          <NavLink to="about-us">
            <Button variant="light">About us</Button>
          </NavLink>
          <NavLink to="stories">
            <Button variant="light">Read</Button>
          </NavLink>
          <NavLink to="editor">
            <Button variant="light">Write</Button>
          </NavLink>
          {currentUser.isLoggedIn ? (
            <DropDown />
          ) : (
            <NavLink to="authentication/sign-in">
              <Button variant="dark">Sign in</Button>
            </NavLink>
          )}
        </ButtonWrapper>
      </Nav>
      <Outlet />
    </>
  );
};
export default NavBar;
