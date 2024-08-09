import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button from "react-bootstrap/Button";
import DropDown from "../../components/dropdown/dropdown.component";

import "./navigation.styles.css";
const NavBar = () => {
  const currentUser = useSelector(selectCurrentUser);
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
      </nav>
      <Outlet />
    </>
  );
};
export default NavBar;
