import React from 'react';
import '../App.css';
import { Nav, Navbar, Container } from 'react-bootstrap';

function NavBar() {
  return (
		<Navbar collapseOnSelect expand="lg" sticky="top" bg="light" variant="light">
			<Container>
				<Navbar.Brand>Pillxir</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link>Page 2</Nav.Link>
						<Nav.Link>Page 3</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link>Something</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
  );
}

export default NavBar;
