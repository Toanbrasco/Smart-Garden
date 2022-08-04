import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap'
import Bec from '../assets/images/BEC-TR.png'
import Loading from '../Component/Loading/Loading';
import { numberFormat, totalAmount, totalPrice, filterCart } from '../Constants';

import { CartContext } from '../Contexts/CartContext'
import { ProductContext } from '../Contexts/ProductContext';

function Payment() {
    const { products, getProducts } = useContext(ProductContext)
    const { cart, getCart, removeCartItem, handleCount } = useContext(CartContext)

    useEffect(() => {
        document.title = "Payment"
        getProducts()
        getCart()
    }, []);

    // const cartArr = [1, 2, 3, 4]
    const Check = false

    if (products.loading) {
        return <Loading />
    }
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4 cursor-p border-bottom'>
                    <span><Link to='/'>Shop</Link> / <Link to='/cart'>Cart</Link> / Payment </span>
                </Col>
                {/* <Col md={12} className='mt-3 '>
                    <h5 className="border-bottom text-right"><strong>Thanh Toán</strong></h5>
                </Col> */}
            </Row>
            <Row className='f-flex flex-wrap mb-5'>
                <Col md={7} className=' order-md-2 mt-4'>
                    {
                        filterCart(cart, products).map((item, index) =>
                            <div key={index} className="w-100 d-flex border-bottom cursor-d">
                                <div className='col-img-bec w-20 '>
                                    <img className='w-100 p-xs-0 p-md-3' src={Bec} alt="Bec" />
                                </div>
                                <div className='w-40 d-flex align-items-start flex-column justify-content-center p-3'>
                                    <span className="m-0">{item.name}</span>
                                    <small>{item.category.main}</small>
                                </div>
                                <div className="w-20 d-flex justify-content-center align-items-center">
                                    {/* <div className="btn-nav" onClick={() => handleCount(item._id, 1)}><span>-</span></div> */}
                                    <div className=""><span>{item.count}</span></div>
                                    {/* <div className="btn-nav" onClick={() => handleCount(item._id, 0)}><span>+</span></div> */}
                                </div>
                                <div className='w-30 d-flex align-items-center justify-content-end'>
                                    <span className='m-0'>{numberFormat(item.price.base * item.count)}</span>
                                </div>
                                <div className='w-10 d-flex align-items-center justify-content-end cursor-p'>
                                    {/* <div onClick={() => removeCartItem(item._id)}>X</div> */}
                                </div>
                            </div>
                        )
                    }
                </Col>
                <Col md={5} className='order-md-1 mt-4'>
                    <div className=''>
                        <div className="w-100">
                            <form action="" className="w-100 d-flex flex-column">
                                <label className='mt-2 cursor-d'>Họ và tên</label>
                                <input type="text" name="" id="" className='input-cus mt-2' />
                                <label className='mt-2 cursor-d'>Số điện thoại</label>
                                <input type="text" name="" id="" className='input-cus mt-2' />
                                <label className='mt-2 cursor-d'>Địa chỉ</label>
                                <input type="text" name="" id="" className='input-cus mt-2' />
                                <label className='mt-2 cursor-d'>Ghi chú</label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ghi chú tại đây"
                                    style={{ height: '100px' }}
                                />
                            </form>
                        </div>
                        <div className='w-100 d-flex justify-content-end flex-column cursor-d p-3 bg-light mt-3'>
                            <h6><strong>Thông tin giỏ hàng</strong></h6>
                            <div className="w-100 d-flex justify-content-between">
                                <span>Quantity: </span>
                                <span> {totalAmount(cart, products)}</span>
                            </div>
                            {/* <div className="w-100 d-flex justify-content-between">
                                    <span>Giảm giá: </span>
                                    <span>0</span>
                                </div> */}
                            <div className="w-100 d-flex justify-content-between">
                                <span>Discount: </span>
                                <span>0</span>
                            </div>
                            <div className="w-100 d-flex justify-content-between">
                                <span>Total: </span>
                                <span><strong>{numberFormat(totalPrice(cart, products))}</strong></span>
                            </div>
                        </div>
                        <div className="w-100 input-group input-group-sm my-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Mã giảm giá</span>
                            </div>
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            <div className="input-group-prepend">
                                <button className={`btn ${Check ? 'btn-outline-success' : 'btn-outline-primary'}`} type="button">Kiểm tra</button>
                            </div>
                        </div>
                        <div className="Btn-Payment w-100 p-2 mt-3 cursor-p">
                            <span><Link to='/payment' className='text-white'>Thanh toán</Link></span>
                        </div>
                    </div>

                </Col>


            </Row>
        </Container >
    )
}

export default Payment