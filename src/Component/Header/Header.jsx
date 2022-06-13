import React from 'react'
import './Header.css'
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap'
import Logo from '../../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
    return (
        <Navbar bg="light" expand="lg" className='p-0 Header'>
            <Container className="position-relative w-100 h-100 d-flex justify-content-md-between ">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto h-100">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Product</Nav.Link>
                        <Nav.Link href="#home">About</Nav.Link>
                        <Nav.Link href="#link">Contact</Nav.Link>

                    </Nav>
                    <Nav className="me-auto justify-content-end flex-grow-1 pe-3 h-100">
                        <Nav.Link href="#link"><FontAwesomeIcon icon={faSearch} /></Nav.Link>
                        <Nav.Link href="#home"><FontAwesomeIcon icon={faShoppingCart} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="#home" className='d-none d-md-none d-lg-block mx-auto position-absolute top-50 start-50 translate-middle h-100 p-0' ><img className='img-brand' src={Logo}></img></Navbar.Brand>
                <Navbar.Brand href="#home" className='d-lg-none d-md-flex m-0 h-100 p-0' ><img className='img-brand' src={Logo}></img></Navbar.Brand>

            </Container>
        </Navbar>

    )
}

export default Header