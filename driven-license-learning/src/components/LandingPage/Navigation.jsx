'use client'
import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
function Navigation () {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">Driven License Learning</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/courses">Courses</Nav.Link>
                        <Nav.Link href="/test">Test</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">Sign In</Nav.Link>
                        <Nav.Link href="#">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;