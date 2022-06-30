import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap'
import Logo from '../../assets/images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'

function Header() {
    const Location = useLocation().pathname
    // console.log(`=> Location`, Location)
    return (
        <Navbar bg="light" expand="lg" className='p-0 Header'>
            <Container className="position-relative w-100 h-100 d-flex justify-content-md-between ">
                <Navbar.Brand as={Link} to='/' href="#home" className='d-none d-md-none d-lg-flex position-absolute translate-middle w-100 h-100 p-0 justify-content-center'><img className='img-brand' src={Logo} alt="Logo"></img></Navbar.Brand>
                <Navbar.Brand as={Link} to='/' href="#home" className='d-lg-none d-md-flex m-0 h-100 p-0' ><img className='img-brand' src={Logo} alt="Logo"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{ zIndex: '1' }} className="bg-light">
                    <Nav className="mr-auto h-100 text-center" >
                        <Nav.Link as={Link} to='/' className='text-dark' style={Location === '/' ? { display: 'none' } : { display: 'block' }} >Home</Nav.Link>
                        <Nav.Link as={Link} to='/products' className='text-dark' style={Location === '/products' ? { display: 'none' } : { display: 'block' }}>Product</Nav.Link>
                        <Nav.Link as={Link} to='/blog' className='text-dark' style={Location === '/blog' ? { display: 'none' } : { display: 'block' }}>Blog</Nav.Link>
                        <Nav.Link as={Link} to='/service' className='text-dark' style={Location === '/service' ? { display: 'none' } : { display: 'block' }}>Service</Nav.Link>
                        {/* <Nav.Link as={Link} to='/About' className='text-dark'>About</Nav.Link> */}
                        <Nav.Link as={Link} to='/contact' className='text-dark' style={Location === '/contact' ? { display: 'none' } : { display: 'block' }}>Contact</Nav.Link>
                    </Nav>
                    <Nav className="me-auto justify-content-end flex-grow-1 pe-3 h-100 text-center">
                        <Nav.Link as={Link} to='/' className='text-dark'><FontAwesomeIcon icon={faSearch} /></Nav.Link>
                        <Nav.Link as={Link} to='/cart' className='text-dark'><FontAwesomeIcon icon={faShoppingCart} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header