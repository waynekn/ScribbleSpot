import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  margin: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLink = styled(Link)`
  margin: 0 5px;
`;

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
