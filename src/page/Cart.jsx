import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import Bec from '../assets/images/BEC-TR.png'
// import '../style/Product.css'


function Cart() {
    const cartArr = []

    useEffect(() => {
        document.title = "Cart"
    }, []);

    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4 cursor-p'>
                    <span><Link to='/'>Shop</Link> / Cart </span>
                </Col>

            </Row>

            <Row className='border-bottom' style={cartArr.length !== 0 ? { display: 'block' } : { display: 'none' }}>
                <Col md={12} lg={9} className='mt-3'>
                    <div className="w-100 d-flex ">
                        <div className='col-img-bec w-20 '>
                            <span>Product</span>
                        </div>
                        <div className='w-40 d-flex align-items-start flex-column justify-content-center p-3'>

                        </div>
                        <div className="w-20 d-flex justify-content-center align-items-center">
                            <span>Quantity</span>
                        </div>
                        <div className='w-30 d-flex align-items-center justify-content-end'>
                            <span className='m-0'>Price</span>
                        </div>
                        <div className='w-10 d-flex align-items-center justify-content-end cursor-p'>
                            <div></div>
                        </div>
                    </div>
                </Col>
                <Col md={0} lg={3} className='mt-3 '>

                </Col>
            </Row>
            {
                cartArr.length !== 0 ?
                    <Row>
                        <Col lg={9} className=''>
                            {
                                cartArr.map((item, index) =>
                                    <div key={item} className="w-100 d-flex border-bottom">
                                        <div className='col-img-bec w-20 '>
                                            <img className='w-100 p-xs-0 p-sm-2 p-md-3' src={Bec} alt="Bec" />
                                        </div>
                                        <div className='w-40 d-flex align-items-start flex-column justify-content-center p-3'>
                                            <span className="m-0">Béc ascxv </span>
                                            <small>Loại</small>
                                        </div>
                                        <div className="w-20 d-flex justify-content-center align-items-center">
                                            <div className="btn-nav"><span>-</span></div>
                                            <div className="btn-nav"><span>1</span></div>
                                            <div className="btn-nav"><span>+</span></div>
                                        </div>
                                        <div className='w-30 d-flex align-items-center justify-content-end'>
                                            <span className='m-0'>123.123.123 VNĐ</span>
                                        </div>
                                        <div className='w-10 d-flex align-items-center justify-content-end cursor-p'>
                                            <div>X</div>
                                        </div>
                                    </div>
                                )
                            }
                        </Col>
                        <Col lg={3} className='position-relative mt-lg-0 mt-3'>
                            <div className='sticky-top'>
                                <div className='w-100 d-flex justify-content-end flex-column cursor-d p-3 bg-light'>
                                    <h6><strong>Thông tin giỏ hàng</strong></h6>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span>SL: </span>
                                        <span> 3</span>
                                    </div>
                                    {/* <div className="w-100 d-flex justify-content-between">
                                    <span>Giảm giá: </span>
                                    <span>0</span>
                                </div> */}
                                    <div className="w-100 d-flex justify-content-between">
                                        <span>Total: </span>
                                        <span>123.123.123 VNĐ</span>
                                    </div>

                                </div>
                                <div className="Btn-Payment w-100 p-2 mt-3 cursor-p">
                                    <span><Link to='/payment' className='text-white'>Thanh toán</Link></span>
                                </div>
                            </div>

                        </Col>
                    </Row>
                    : <Row>
                        <Col md={12} className='d-flex flex-column align-items-center justify-content-center vh-80'>
                            <h3  className='text-center'>Giỏ hàng của bạn không có sản phẩm nào</h3>
                            <span><Link to='/products'>Về lại trang sản phẩm</Link></span>
                        </Col>
                    </Row>
            }
            <Row style={cartArr.length !== 0 ? { display: 'block' } : { display: 'none' }}>
                <Col md={12} className='d-flex justify-content-center align-items-center my-5'>
                    <Link to='/' className="mx-1 text-dark">Home</Link>
                    <Link to='/products' className="mx-1 text-dark">Product</Link>
                    {/* <a className="mx-1 text-dark">About</a> */}
                    <Link to='/contact' className="mx-1 text-dark">Contact</Link>
                </Col>
            </Row>
        </Container >
    )
}

export default Cart