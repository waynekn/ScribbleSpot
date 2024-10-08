import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button from "react-bootstrap/Button";
import DropDown from "../../components/dropdown/dropdown.component";
import SearchBar from "../../components/search-bar/search-bar.component";

import { Nav, NavLink } from "./navigation.styles";
const NavBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <>
      <Nav>
        <SearchBar />
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
      </Nav>
      <Outlet />
    </>
  );
};
export default NavBar;
