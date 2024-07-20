// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function CustomNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">for-fomo-factory</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="text-white" href="#home">Bharath</Nav.Link>
                        <Nav.Link className="text-white" href="mailto:johndoe@example.com">maestrobharath@gmail.com</Nav.Link>
                        <Nav.Link className="text-white" href="tel:+1234567890">+91 6382 397 798</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
