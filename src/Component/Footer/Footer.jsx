import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logoFooter from '../../assets/images/LogoFooter.png'
import '../Footer/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationArrow } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <div className="Footer mt-5 pb-4">
            <Container>
                <Row>
                    <Col md={12} className='pt-3 pb-3 border-bottom'>
                        <img src={logoFooter} alt="Footer" width='170px' />
                    </Col>
                </Row>
                <Row className=''>
                    <Col md={6} className="d-flex flex-column mt-3">
                        <h5><strong>Thông tin</strong></h5>
                        <span><FontAwesomeIcon icon={faEnvelope} /> Email: ABC@gmail.com</span>
                        <span><FontAwesomeIcon icon={faPhone} /> Phone: 0123456789</span>
                        <span><FontAwesomeIcon icon={faPhone} /> Zalo: 0123456789</span>
                        <span><FontAwesomeIcon icon={faLocationArrow} /> Địa chỉ: 1 abc, abc, abc, HCM</span>
                    </Col>
                    <Col md={3} className="d-flex flex-column mt-3">
                        <h5><strong>Quick Link</strong></h5>
                        <span>Home</span>
                        <span>Products</span>
                        <span>About</span>
                        <span>Contact</span>
                    </Col>
                    <Col md={3} className="d-flex flex-column mt-3">
                        <h5><strong>FanFage</strong></h5>
                        <div className='bg-primary w-100 h-100 d-flex justify-content-center align-items-center text-white'>
                            FaceBook
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer