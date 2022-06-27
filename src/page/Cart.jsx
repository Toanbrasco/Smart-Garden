import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import Bec from '../assets/images/BEC-TR.png'
// import '../style/Product.css'


function Cart() {
    const cartArr = [1, 2, 3, 4]
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4'>
                    <span>Shop / Cart </span>
                </Col>
                <Col md={12} className='mt-3 '>
                    <h5 className="border-bottom text-right"><strong>Your Cart</strong></h5>
                </Col>
            </Row>
            <Row>
                {
                    cartArr.map((item, index) =>
                        <Col md={12} key={index}>
                            <Row className='d-flex h-100 justify-content-between align-items-center'>
                                <Col md={2} xs={2} className='col-img-bec'><img className='w-100 p-xs-0 p-md-3' src={Bec} alt="Bec" /></Col>
                                <Col md={10} xs={10} className='w-100 h-100'>
                                    <Row className='w-100 h-25 m-0'>
                                        <Col md={12} xs={12} className='d-flex align-items-center justify-content-end p-0'>
                                            <div>X</div>
                                        </Col>
                                    </Row>
                                    <Row className='w-100 h-75 m-0 d-flex align-items-center justify-content-between cart-items-info'>
                                        <Col md={5} xs={5} className='d-flex align-items-center p-0'>
                                            <span className="m-0"><strong>Béc ascxv {item}</strong></span>
                                        </Col>
                                        <Col md={2} xs={2} className="d-flex justify-content-center align-items-center">
                                            <div className="btn-nav"><span>-</span></div>
                                            <div className="btn-nav"><span>1</span></div>
                                            <div className="btn-nav"><span>+</span></div>
                                        </Col>
                                        <Col md={5} xs={5} className='d-flex align-items-center justify-content-end p-0'>
                                            <span className='text-danger m-0'><strong>123.123.123 VNĐ</strong></span>
                                        </Col>
                                    </Row>
                                    <Row className='w-100 m-0 border-bottom'>
                                        <Col md={12} xs={12}></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    )
                }
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-end mt-5'>
                    <div className='w-30 d-flex justify-content-end flex-column '>
                        <span><strong>Item: </strong> 3</span>
                        <span><strong>Total: </strong> 123.123.123 VNĐ</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-between mt-5'>
                    <a>Tiếp tục shoppping</a>
                    <div className="Btn-Payment w-30 p-2">
                        <span>Thanh toán</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-center align-items-center my-5'>
                    <Link to='/' className="mx-1 text-dark">Home</Link>
                    <Link to='/Products' className="mx-1 text-dark">Product</Link>
                    {/* <a className="mx-1 text-dark">About</a> */}
                    <Link to='/Contact' className="mx-1 text-dark">Contact</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart