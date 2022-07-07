import React, { useState } from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Modal, Button, Form } from 'react-bootstrap'
import Logo from '../../assets/images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch, faClose } from '@fortawesome/free-solid-svg-icons'

function Header() {
    const Location = useLocation().pathname
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const fakeList = []
    return (
        <>
            <Navbar bg="light" expand="lg" className='p-0 Header' collapseOnSelect >
                <Container className="position-relative w-100 h-100 d-flex justify-content-md-between " style={{ zIndex: '10' }}>
                    <Navbar.Brand as={Link} to='/' href="#home" className='d-none d-md-none d-lg-flex position-absolute translate-middle w-100 h-100 p-0 justify-content-center'><img className='img-brand' src={Logo} alt="Logo"></img></Navbar.Brand>
                    <Navbar.Brand as={Link} to='/' href="#home" className='d-lg-none d-md-flex m-0 h-100 p-0' ><img className='img-brand' src={Logo} alt="Logo"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="bg-light">
                        <Nav className="mr-auto h-100 text-center" style={{ zIndex: '10' }}>
                            <Nav.Link as={Link} to='/' className='text-dark' style={Location === '/' ? { display: 'none' } : { display: 'block' }} eventKey="1" >Home</Nav.Link>
                            <Nav.Link as={Link} to='/products' className='text-dark' style={Location === '/products' ? { display: 'none' } : { display: 'block' }} eventKey="1">Product</Nav.Link>
                            <Nav.Link as={Link} to='/blog' className='text-dark' style={Location === '/blog' ? { display: 'none' } : { display: 'block' }} eventKey="1">Blog</Nav.Link>
                            <Nav.Link as={Link} to='/service' className='text-dark' style={Location === '/service' ? { display: 'none' } : { display: 'block' }} eventKey="1">Service</Nav.Link>
                            {/* <Nav.Link as={Link} to='/About' className='text-dark'>About</Nav.Link> */}
                            <Nav.Link as={Link} to='/contact' className='text-dark' style={Location === '/contact' ? { display: 'none' } : { display: 'block' }} eventKey="1">Contact</Nav.Link>
                        </Nav>
                        <Nav className="me-auto justify-content-end flex-grow-1 pe-3 h-100 text-center" style={{ backgroundColor: 'transparent' }}>
                            <Nav.Link className='text-dark' onClick={() => handleShow()} style={{ zIndex: '10' }} eventKey="1"><FontAwesomeIcon icon={faSearch} /></Nav.Link>
                            <Nav.Link as={Link} to='/cart' className='text-dark position-relative' eventKey="1"><FontAwesomeIcon icon={faShoppingCart} />
                                <div className='position-absolute badge-custom d-none d-lg-flex' >
                                    <span style={fakeList.length === 0 ? { display: 'none' } : { display: 'flex' }}>{fakeList.length}</span>
                                </div>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                backdrop="static"
            >
                <Modal.Header>
                    <Modal.Title id="example-custom-modal-styling-title">

                    </Modal.Title>
                    {/* <CloseButton></CloseButton> */}
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}><FontAwesomeIcon icon={faClose} /></button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="d-flex ">
                            {/* <Form.Label>Search</Form.Label> */}
                            <Form.Control type="text" placeholder="Search..." />
                            <Button>Search</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            {/* <Container>
                    <Row>
                        <Col md={12}>
                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container> */}
        </>
    )
}

export default Header