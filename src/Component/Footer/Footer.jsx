import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../Footer/Footer.css'
import { Col, Container, Row } from 'react-bootstrap'
import logoFooter from '../../assets/images/LogoFooter.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationArrow } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    const Location = useLocation().pathname
    // console.log(`=> Location`, Location)
    return (
        <div className="Footer ">
            {
                Location.includes('/admin') || Location.includes('/cart') || Location.includes('/contact') || Location.includes('/products/') === true || Location.includes('/login') === true
                    || Location.includes('/payment') === true || Location.includes('/infomation')  ?
                    <></> :
                    <Container bg='light' className='mt-5 pb-4 cursor-d'>
                        <Row>
                            <Col md={12} className='pt-3 pb-3 border-bottom d-none d-md-block'>
                                <img src={logoFooter} alt="Footer" width='170px' />
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col xs={8} sm={7} md={5} className="d-flex flex-column mt-3">
                                <h5><strong>Thông tin</strong></h5>
                                <span><FontAwesomeIcon icon={faEnvelope} /> Email: ABC@gmail.com</span>
                                <span><FontAwesomeIcon icon={faPhone} /> Phone: 0123456789</span>
                                <span><FontAwesomeIcon icon={faPhone} /> Zalo: 0123456789</span>
                                <span><FontAwesomeIcon icon={faLocationArrow} /> Địa chỉ: 1 abc, abc, abc, HCM</span>
                            </Col>
                            <Col xs={4} sm={5} md={3} className="d-flex flex-column mt-3 cursor-p">
                                <h5><strong>Quick Link</strong></h5>
                                <span><Link to="/">Home</Link></span>
                                <span><Link to="/products">Products</Link></span>
                                <span><Link to="/blog">Blog</Link></span>
                                <span><Link to="/service">Service</Link></span>
                                {/* <span as={Link} to='/'>About</span> */}
                                <span><Link to="/contact">Contact</Link></span>
                            </Col>
                            <Col sm={12} md={4} className="d-flex flex-column mt-3">
                                <h5><strong>FanFage</strong></h5>
                                <div className='FaceBook bg-primary w-100 d-flex justify-content-center align-items-center text-white'>
                                    FaceBook
                                </div>
                            </Col>
                        </Row>
                    </Container>
            }
        </div>
    )
}

export default Footer