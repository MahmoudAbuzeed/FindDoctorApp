import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Container>
          <Link to='/'>
        <NavbarBrand >Find Doctor</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <Link to='/Doctors'>
              <NavLink >
              <NavbarText>
              Doctors
              </NavbarText>
              </NavLink>
              </Link>
            </NavItem>
          </Nav>
          <Link to='/Login'>
          <NavbarText><h6>Login</h6></NavbarText>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to='/Signup'>
          <NavbarText><h6>Singup</h6></NavbarText>
          </Link>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export  {NavBar};