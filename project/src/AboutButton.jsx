import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  margin-right: auto;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #ddd;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/hi">Hi</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
