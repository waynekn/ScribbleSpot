import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  margin: 5px 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const NavLink = styled(Link)`
  margin: 0 5px;
`;
