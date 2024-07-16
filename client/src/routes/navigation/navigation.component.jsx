import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../api-requests/requests";

import "./navigation.styles.css";
const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <nav className="navbar">
        <Link to="about-us" className="nav-link">
          <Button variant="light">About us</Button>
        </Link>
        <Link to="stories" className="nav-link">
          <Button variant="light">Read</Button>
        </Link>
        <Link to="write" className="nav-link">
          <Button variant="light">Write</Button>
        </Link>
        {currentUser ? (
          <Button variant="dark" onClick={() => signOutUser()}>
            Sign out
          </Button>
        ) : (
          <Link to="authentication/sign-in" className="nav-link">
            <Button variant="dark">Sign in</Button>
          </Link>
        )}
      </nav>
      <Outlet />
    </>
  );
};
export default NavBar;
