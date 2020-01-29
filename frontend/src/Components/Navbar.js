import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';

function NavBar() {
  return (
		<Navbar collapseOnSelect expand="lg" sticky="top" bg="light" variant="light">
			<Container>
				<Navbar.Brand>Pillxir</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
						<Nav.Link as={Link} to="/upload-receipt">Upload Receipt</Nav.Link>
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
