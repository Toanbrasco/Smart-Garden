import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap'
import Bec from '../assets/images/BEC-TR.png'
import Loading from '../Component/Loading/Loading';
import { numberFormat, totalAmount, totalPrice, filterCart } from '../Constants';

import { CartContext } from '../Contexts/CartContext'
import { ProductContext } from '../Contexts/ProductContext';
import { OrderContext } from '../Contexts/OrderContext';

function Payment() {
    const { products, getProductsAll } = useContext(ProductContext)
    const { cart, getCart } = useContext(CartContext)
    const { order, addOrder } = useContext(OrderContext)
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show5, setShow5] = useState(false)
    const [modalText, setModalText] = useState("")
    const [orderForm, setOrderForm] = useState({
        name: '',
        phone: '',
        adress: '',
        note: '',
        shipping: '',
        payment: '',
    })
    
    const handleOrderForm = event => setOrderForm({ ...orderForm, [event.target.name]: event.target.value })

    const handleSubmitPayment = () => {
        if (orderForm.name.length > 10 && orderForm.phone > 9 && orderForm.adress.length > 10) {
            if (orderForm.payment.length !== 0 && orderForm.payment !== "0" && orderForm.shipping.length !== 0 && orderForm.shipping !== "0") {
                setShow2(true)
            } else {
                setModalText('Vui lòng kiểm tra lại phương thức vận chuyển và phương thức thanh toán')
                setShow(true)
            }
            // setModalText('Ok')
        } else {
            setModalText('Vui lòng nhập đầy đủ các thông tin')
            setShow(true)
        }
    }


    const handleOrder = () => {
        setShow2(false)
        addOrder({ ...orderForm, cart: cart.data })
        setShow5(true)
    }
    const handleModal = (action) => {
        switch (action) {
            case true:
                setOrderForm({
                    name: '',
                    phone: '',
                    adress: '',
                    note: '',
                    shipping: '',
                    payment: ''
                })
                setShow5(false)
                break;

            case false:
                setShow5(false)
                break;

            default:

                break;
        }
    }
    useEffect(() => {
        document.title = "Payment"
        getProductsAll()
        getCart()
    }, []);

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
                                <input type="text" name="name" className='input-cus mt-2' defaultValue={orderForm.name} onChange={(e) => handleOrderForm(e)} />
                                <label className='mt-2 cursor-d'>Số điện thoại</label>
                                <input type="text" name="phone" className='input-cus mt-2' defaultValue={orderForm.phone} onChange={(e) => handleOrderForm(e)} />
                                <label className='mt-2 cursor-d'>Địa chỉ</label>
                                <input type="text" name="adress" className='input-cus mt-2' defaultValue={orderForm.adress} onChange={(e) => handleOrderForm(e)} />
                                <label className='mt-2 cursor-d'>Ghi chú</label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ghi chú tại đây"
                                    style={{ height: '100px' }}
                                    name="note"
                                    defaultValue={orderForm.note}
                                    onChange={(e) => handleOrderForm(e)}
                                />
                                <div className='d-flex justify-content-between mt-2'>
                                    <label className='mt-2 cursor-d w-50'>Vận chuyển</label>
                                    <label className='mt-2 cursor-d w-50 ml-2'>Thanh toán</label>
                                </div>
                                <div className='d-flex mt-2'>
                                    <Form.Group className='cursor-p w-50'>
                                        <Form.Control as="select" aria-label="Default select example" name="shipping" defaultValue={orderForm.shipping} onChange={(e) => handleOrderForm(e)}>
                                            <option value="0">Phương thức vận chuyển</option>
                                            <option value="Ship COD">Ship COD</option>
                                            <option value="Nhận hàng tại của hàng">Nhận hàng tại của hàng</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className='cursor-p ml-2 w-50'>
                                        <Form.Control as="select" aria-label="Default select example" name="payment" defaultValue={orderForm.payment} onChange={(e) => handleOrderForm(e)}>
                                            <option value="0">Phương thức thanh toán</option>
                                            <option value="Nhận hàng trả tiền">Nhận hàng trả tiền</option>
                                            <option value="Chuyển khoản">Chuyển khoản</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </form>

                        </div>
                        <div className='w-100 d-flex justify-content-end flex-column cursor-d p-3 bg-light mt-3'>
                            <h6><strong>Thông tin giỏ hàng</strong></h6>
                            <div className="w-100 d-flex justify-content-between">
                                <span>Tồng số lượng: </span>
                                <span> {totalAmount(cart, products)}</span>
                            </div>
                            {/* <div className="w-100 d-flex justify-content-between">
                                    <span>Giảm giá: </span>
                                    <span>0</span>
                                </div> */}
                            {/* <div className="w-100 d-flex justify-content-between">
                                <span>Discount: </span>
                                <span>0</span>
                            </div> */}
                            <div className="w-100 d-flex justify-content-between">
                                <span>Giá đơn hàng: </span>
                                <span><strong>{numberFormat(totalPrice(cart, products))}</strong></span>
                            </div>
                        </div>
                        <Button className="w-100 p-2 mt-3 cursor-p" onClick={() => handleSubmitPayment()}>Thanh toán</Button>

                    </div>
                </Col>
            </Row>

            <Modal show={show} onHide={() => setShow(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>Ok</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={() => setShow2(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span>Họ và tên: </span>
                        <span>{orderForm.name}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-2'>
                        <span>Số điện thoại: </span>
                        <span>{orderForm.phone}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center my-2'>
                        <span>Địa chỉ: </span>
                        <span>{orderForm.adress}</span>
                    </div>
                    {
                        filterCart(cart, products).map((item, index) =>
                            <div key={index} className='d-flex flex-column border-top py-2'>
                                <span className=''>{item.name}</span>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='w-40'>{numberFormat(item.price.base)} / 1 cái</span>
                                    <span className='w-30'>SL:{item.count}</span>
                                    <span className='w-30'>{numberFormat(item.price.base * item.count)}</span>
                                </div>
                            </div>
                        )
                    }
                    <div className='d-flex justify-content-between align-items-center border-top pt-2 mt-2'>
                        <span>Phương thức thanh toán: </span>
                        <span>{orderForm.payment}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-2'>
                        <span>Phương thức vận chuyển: </span>
                        <span>{orderForm.shipping}</span>
                    </div>
                    <div className="w-100 d-flex justify-content-between mt-2">
                        <span>Tồng số lượng sản phẩm: </span>
                        <span> {totalAmount(cart, products)}</span>
                    </div>
                    <div className="w-100 d-flex justify-content-between mt-2">
                        <span>Tổng tiền: </span>
                        <span><strong>{numberFormat(totalPrice(cart, products))}</strong></span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleOrder()}>Đặt hàng</Button>
                    <Button variant="danger" onClick={() => setShow2(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show5} onHide={() => setShow5(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!order.message ?
                        <div className="spinner-border" role="status" style={{ width: '50px', height: '50px' }}>
                            <span className="sr-only">Loading...</span>
                        </div> : order.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleModal(order.success)}>OK</Button>
                </Modal.Footer>
            </Modal>

        </Container >
    )
}

export default Payment