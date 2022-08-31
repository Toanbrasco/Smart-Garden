import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Form, Modal, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Header.css';
import { UrlApi } from '../../Constants';

import { faClose, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartContext } from '../../Contexts/CartContext'
import { ProductContext } from '../../Contexts/ProductContext'
import { ConfigContext } from '../../Contexts/ConfigContext'
import Loading from '../Loading/Loading';

function Header() {
    const Location = useLocation().pathname
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
        setSelectValue(0)
    };
    const navigate = useNavigate()

    const { cart, getCart } = useContext(CartContext)
    const { refeshProduct } = useContext(ProductContext)
    const { config, getConfig } = useContext(ConfigContext)
    // const [href, setHref] = useState('#')
    const [inputText, SetInputText] = useState('')
    const [selectValue, setSelectValue] = useState(0)

    const searchSubmit = (event) => {
        event.preventDefault()
        const waringSearch = document.getElementById('waringSearch')
        if (inputText.length !== 0) {
            switch (parseInt(selectValue)) {
                case 0:
                    navigate(`/products?search=${inputText}`)
                    setShow(false)
                    // console.log('case_0')
                    break;
                case 1:
                    navigate(`/blog?search=${inputText}`)
                    setShow(false)
                    // console.log('case_1')
                    break;
                case 2:
                    navigate(`/service?search=${inputText}`)
                    setShow(false)
                    // console.log('case_2')
                    break;

                default:
                    break;
            }
        } else {
            waringSearch.innerHTML = 'Không có từ khoá để tìm kiếm'

        }
    }

    useEffect(() => {
        getCart()
        getConfig()
    }, [])
    
    if (config.loading) {
        return <Loading />
    }
    return (
        <>
            {
                Location.includes('/admin') || Location.includes('/login') || Location.includes('/infomation') ? <></> :
                    <>
                        <Navbar bg="light" expand="lg" className='p-0 Header' collapseOnSelect >
                            <Container className="position-relative w-100 h-100 d-flex justify-content-md-between " style={{ zIndex: '10' }}>
                                <Navbar.Brand className='brand d-none d-md-none d-lg-flex position-absolute translate-middle w-100 h-100 m-0 mr-0 p-0 justify-content-center'>
                                    <Link to='/'>
                                        <img className='img-brand' src={`${UrlApi}/image/${config.data.logo}`} alt="Logo"></img>
                                    </Link>
                                </Navbar.Brand>
                                <Navbar.Brand className='d-lg-none d-md-flex m-0 mr-0 h-100 p-0' >
                                    <Link to='/'>
                                        <img className='img-brand' src={`${UrlApi}/image/${config.data.logo}`} alt="Logo"></img>
                                    </Link>
                                </Navbar.Brand>
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
                                        <Nav.Link as={Link} to='/cart' onClick={() => refeshProduct()} className='text-dark position-relative' eventKey="1"><FontAwesomeIcon icon={faShoppingCart} />
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
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}><FontAwesomeIcon icon={faClose} /></button>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={e => { e.preventDefault() }}>
                                    <Form.Group className="d-flex ">
                                        {/* <Form.Label>Search</Form.Label> */}
                                        <Form.Control as="select" className='searchSelect' id='SelectSearch' onChange={(e) => setSelectValue(e.target.value)}>
                                            <option value="0">Sản Phẩm</option>
                                            <option value="1">Blog</option>
                                            <option value="2">Service</option>
                                        </Form.Control>
                                        <Form.Control type="text" placeholder="Search..." className='searchText' id='searchInput' onChange={(e) => SetInputText(e.target.value)} onkeypress="return event.keyCode != 13;" />
                                    </Form.Group>
                                    <small className='text-danger' id='waringSearch'></small>
                                </Form>
                            </Modal.Body>
                            <Button type='button' onClick={(event) => searchSubmit(event)}>Search</Button>
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