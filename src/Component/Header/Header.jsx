import { faClose, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Form, Modal, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/Logo.png';
import './Header.css';
import { CartContext } from '../../Contexts/CartContext'
import { ProductContext } from '../../Contexts/ProductContext'

function Header() {
    const Location = useLocation().pathname
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const { cart, getCart } = useContext(CartContext)
    const { productSearch } = useContext(ProductContext)
    const [href, setHref] = useState('#')

    const handleSearch = (text) => {
        const searchInput = document.getElementById('searchInput').value
        const SelectSearch = document.getElementById('SelectSearch').value
        const waringSearch = document.getElementById('waringSearch')
        if (searchInput.length !== 0) {
            // console.log('setIsActive: true')
            switch (SelectSearch) {
                case "0":
                    setHref('/products')
                    break;
                case "1":
                    setHref('/blog')
                    break;
                case "2":
                    setHref('/service')
                    break;

                default:
                    setHref('/products')
                    break;
            }
            waringSearch.innerHTML = ""
            productSearch(searchInput)
            // setShow(false)
            // setIsActive(true)
        } else {
            console.log('SetHref: #')
            setHref('#')
            waringSearch.innerHTML = "Không có từ khoá để tìm kiếm"
        }

    }

    useEffect(() => {
        getCart()
    }, [])
    return (
        <>
            {
                Location.includes('/admin') || Location.includes('/login') ? <></>:
                <>
                    <Navbar bg="light" expand="lg" className='p-0 Header' collapseOnSelect >
                        <Container className="position-relative w-100 h-100 d-flex justify-content-md-between " style={{ zIndex: '10' }}>
                            <Navbar.Brand className='brand d-none d-md-none d-lg-flex position-absolute translate-middle w-100 h-100 m-0 mr-0 p-0 justify-content-center'><Link to='/'><img className='img-brand' src={Logo} alt="Logo"></img></Link></Navbar.Brand>
                            <Navbar.Brand className='d-lg-none d-md-flex m-0 mr-0 h-100 p-0' ><Link to='/'><img className='img-brand' src={Logo} alt="Logo"></img></Link></Navbar.Brand>
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
                                            <span style={cart.data.length === 0 ? { display: 'none' } : { display: 'flex' }}>{cart.data.length}</span>
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
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => { setShow(false); handleSearch('onChange') }}><FontAwesomeIcon icon={faClose} /></button>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="d-flex ">
                                    {/* <Form.Label>Search</Form.Label> */}
                                    <Form.Control as="select" className='w-20' id='SelectSearch'>
                                        <option value="0">Sản Phẩm</option>
                                        <option value="1">Blog</option>
                                        <option value="2">Service</option>
                                    </Form.Control>
                                    <Form.Control type="text" placeholder="Search..." className='w-70' id='searchInput' />
                                    <Button as={Link} to={href} onClick={() => handleSearch('onClick')}>Search</Button>
                                </Form.Group>
                                <small className='text-danger' id='waringSearch'></small>
                            </Form>
                        </Modal.Body>
                    </Modal></>
                    
}
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