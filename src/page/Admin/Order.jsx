import React, { useContext, useState, useEffect } from 'react'
import { Button, Col, Container, Row, Form, Modal } from 'react-bootstrap'
import { DayFormat, filterCart, numberFormat, totalPrice, convertViToEn } from '../../Constants.js'
import { OrderContext } from '../../Contexts/OrderContext'
import { ProductContext } from '../../Contexts/ProductContext'
import Loading from '../../Component/Loading/Loading'

function Order() {
    const { order, getOrder, deleteOrder, updateStatusOrder } = useContext(OrderContext)
    const { products, getProductsAll } = useContext(ProductContext)
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [statusOrder, setStatusOrder] = useState('')
    const [deleteID, setDeleteID] = useState('')

    const statusArr = ['Chưa giải quyết', 'Đang chuẩn bị hàng', 'Đang vận chuyển', "Hoàn thành"]
    const statusArr2 = ['PENDING', 'PACK', 'SHIPPING', "COMPLETE"]
    const [updateStatus, setUpdateStatus] = useState({
        _id: '',
        status: ''
    })
    const convertVN = (text) => {
        let text2 = ''
        statusArr2.forEach((item, index) => {
            if (item === text) {
                text2 = statusArr[index]
            }
        })
        return text2
    }
    const [modalText, setModalText] = useState()
    const [interactive, setInteractive] = useState()

    const switchStatus = (_id, status) => {
        setInteractive('UPDATE')
        setUpdateStatus({ ...updateStatus, _id: _id, status: statusArr2[statusArr2.indexOf(status) + 1] })
        setModalText('Bạn muốn cập nhật hoá đơn ' + _id)
        setShow(true)
    }

    const handleDeleteOrder = (_id) => {
        setInteractive('DELETE')
        setDeleteID(_id)
        setModalText('Bạn muốn xoá hoá đơn ' + _id)
        setShow(true)
    }

    const handleModal = () => {
        if (interactive === 'DELETE') {
            setShow(false)
            deleteOrder(deleteID)
            setShow2(true)
        } else {
            setShow(false)
            updateStatusOrder(updateStatus._id, updateStatus.status)
            setShow2(true)
        }

    }
    const exitModal = () => {
        setShow2(false)
        getOrder()
        getProductsAll()
    }

    useEffect(() => {
        getOrder()
        getProductsAll()
    }, [])
    if (order.loading) {
        <Loading />
    }

    return (
        <Container fluid>
            <Row className='mt-3'>
                <Col md={12} className='' >
                    <h1>Order</h1>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col md={12}>
                    <div className='w-100 d-flex justify-content-between align-items-center bg-light px-3 py-2 rounded'>
                        <span className='w-10'>#id</span>
                        <span className='w-20'>Name</span>
                        <span className='w-30'>Adress</span>
                        <span className='w-20'>Date</span>
                        <span className='w-10'>Price</span>
                        <span className='w-10'>Status</span>
                        {/* <span className='w-10'>Action</span> */}
                    </div>
                </Col>
                {order.data.map((item, index) =>
                    <Col key={index} md={12} className="mt-3" data-toggle="collapse" href={`#Collapse${index}`} role="button" aria-expanded="false" aria-controls={`Collapse${index}`}>
                        <div className='d-flex justify-content-between align-items-center p-3 bg-light' >
                            <span className='w-10'>{index + 1}</span>
                            <span className='w-20'>{item.name}</span>
                            <span className='w-30'>{item.adress}</span>
                            <span className='w-20'>{DayFormat(item.createdAt)}</span>
                            <span className='w-10'>123.123.123 VND</span>
                            <span className='w-10'>{convertVN(item.status)}</span>
                            {/* <span className='w-10'>Action</span> */}
                        </div>
                        {/* <div className=""> */}
                        <div className="collapse mt-3 bg-light p-3" id={`Collapse${index}`}>
                            <div className="w-100 d-flex">
                                <div className="w-70 d-flex flex-column ">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span className='w-50'>Product Name</span>
                                        <span className='w-20'>price</span>
                                        <span className='w-10'>SL</span>
                                        <span className='w-20'>Total price</span>
                                    </div>
                                    {
                                        filterCart(item.cart, products).map((item, index) =>
                                            <div key={index} className='d-flex justify-content-between align-items-center border-bottom'>
                                                <span className='w-50'>{item.name}</span>
                                                <span className='w-20'>{numberFormat(item.price.base)}</span>
                                                <span className='w-10'>SL:{item.count}</span>
                                                <span className='w-20'>{numberFormat(item.price.base * item.count)}</span>
                                            </div>
                                        )
                                    }
                                    <div className='d-flex justify-content-between align-items-center mt-auto'>
                                        <span className='w-60'></span>
                                        <span className='w-20'>Tổng Đơn hàng:</span>
                                        <span className='w-20'>{numberFormat(totalPrice(item.cart, products))}</span>
                                    </div>
                                </div>
                                <div className="w-30">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Tên: </span>
                                        <span>{item.name}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Số đt: </span>
                                        <span>{item.phone}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Địa chỉ: </span>
                                        <span>{item.adress}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Phương thức thanh toán: </span>
                                        <span>{item.payment}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Phương thức vận chuyển: </span>
                                        <span>{item.shipping}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Ngày đặt: </span>
                                        <span>{DayFormat(item.createdAt)}</span>
                                    </div>
                                    <div>
                                        <span>Ghi chú: </span>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Không có ghi chú gì"
                                            style={{ height: '100px' }}
                                            value={item.note}
                                            disabled
                                        />
                                    </div>
                                    <div className='d-flex align-items-start flex-column'>
                                        <span>Hành động: </span>
                                        <div className='w-100 d-flex justify-content-between align-items-center'>
                                            <Button variant="danger" onClick={() => handleDeleteOrder(item._id)}>Xoá Đơn Hàng</Button>
                                            {
                                                item.status === "COMPLETE" ? <></> :
                                                    <Button onClick={() => switchStatus(item._id, item.status)}>Chuyển trạng thái đơn hàng</Button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>

            <Modal show={show} onHide={() => setShow(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalText}
                </Modal.Body>
                <Modal.Footer>
                    {
                        interactive === 'DELETE' ?
                            <Button variant="primary" onClick={() => handleModal()}>OK</Button> :
                            <Button variant="success" onClick={() => handleModal()}>OK</Button>
                    }
                    <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={() => setShow2(false)} animation={false} backdrop="static">
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
                    <Button variant="primary" onClick={() => exitModal()}>OK</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show3} onHide={() => setShow3(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='cursor-p ml-2 w-50'>
                        <Form.Control as="select" aria-label="Default select example" name="payment" defaultValue={statusOrder} onChange={(e) => setStatusOrder(e.target.value)}>
                            <option value="0">Phương thức thanh toán</option>
                            <option value="Nhận hàng trả tiền">Nhận hàng trả tiền</option>
                            <option value="Chuyển khoản">Chuyển khoản</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow3(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Order