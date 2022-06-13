import React from 'react'
import './Header.css'
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap'
import Logo from '../../assets/Logo.png'

function Header(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Product</Nav.Link>
                        <Nav.Link href="#home">About</Nav.Link>
                        <Nav.Link href="#link">Contact</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="#home"><img className='img-brand' src={Logo}></img></Navbar.Brand>
            </Container>
        </Navbar>

    )
}

export default Header