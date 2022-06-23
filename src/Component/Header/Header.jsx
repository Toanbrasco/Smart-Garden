import React from 'react'
import './Header.css'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Logo from '../../assets/images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'

function Header() {
    return (
        <Navbar bg="light" expand="lg" className='p-0 Header'>
            <Container className="position-relative w-100 h-100 d-flex justify-content-md-between ">
                <Navbar.Brand href="#home" className='d-none d-md-none d-lg-flex position-absolute translate-middle w-100 h-100 p-0 justify-content-center'><img className='img-brand' src={Logo} alt="Logo"></img></Navbar.Brand>
                <Navbar.Brand href="#home" className='d-lg-none d-md-flex m-0 h-100 p-0' ><img className='img-brand' src={Logo} alt="Logo"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ zIndex: '1' }} className="bg-light">
                    <Nav className="mr-auto h-100 text-center" >
                        <Nav.Link href="#home" className='text-dark'>Home</Nav.Link>
                        <Nav.Link href="#link" className='text-dark'>Product</Nav.Link>
                        <Nav.Link href="#home" className='text-dark'>About</Nav.Link>
                        <Nav.Link href="#link" className='text-dark'>Contact</Nav.Link>

                    </Nav>
                    <Nav className="me-auto justify-content-end flex-grow-1 pe-3 h-100 text-center">
                        <Nav.Link href="#link" className='text-dark'><FontAwesomeIcon icon={faSearch} /></Nav.Link>
                        <Nav.Link href="#home" className='text-dark'><FontAwesomeIcon icon={faShoppingCart} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header