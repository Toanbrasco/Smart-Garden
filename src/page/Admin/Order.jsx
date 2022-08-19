import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import products from '../../assets/Data/test.json'
import { DayFormat, fakeOrderArr } from '../../Constants.js'
import { OrderContext } from '../../Contexts/OrderContext'
import Loading from '../../Component/Loading/Loading'

function Order() {
    const { order, getOrder } = useContext(OrderContext)
    console.log(`=> order`, order)
    // const [open, setOpen] = useState(false);
    // const productid = ['615675185d27f4331cc3c844', '615675215d27f4331cc3c84a', '6156752a5d27f4331cc3c850']
    const filterProduct = (productid) => {
        let arr = []
        products.forEach(item => {
            productid.forEach((id, index) => {
                if (item._id.$oid === id) {
                    arr.push(item)
                }
            })
        })
        return arr
    }
    useEffect(() => {
        getOrder()
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
            <Row>
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
                            <span className='w-10'>{item.status}</span>
                            {/* <span className='w-10'>Action</span> */}
                        </div>
                        {/* <div className=""> */}
                        <div className="collapse mt-3 bg-light p-3" id={`Collapse${index}`}>
                            <div className="w-100 d-flex">
                                <div className="w-70 d-flex flex-column">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span className='w-50'>Product Name</span>
                                        <span className='w-20'>price</span>
                                        <span className='w-10'>SL</span>
                                        <span className='w-20'>Total price</span>
                                    </div>
                                    {
                                        filterProduct(item.cart).map((item, index) =>
                                            <div key={index} className='d-flex justify-content-between align-items-center'>
                                                <span className='w-50'>{item.name}</span>
                                                <span className='w-20'>{index + 1 * 10000}</span>
                                                <span className='w-10'>SL:{index}</span>
                                                <span className='w-20'>{index + 1 * 10000}</span>
                                            </div>
                                        )
                                    }
                                    <div className='d-flex justify-content-between align-items-center mt-auto'>
                                        <span className='w-60'></span>
                                        <span className='w-20'>Tổng Đơn hàng:</span>
                                        <span className='w-20'>123.123.123 VND</span>
                                    </div>
                                </div>
                                <div className="w-30">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Tên: </span>
                                        <span>{item.name}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Phone: </span>
                                        <span>{item.phone}</span>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span>Adress: </span>
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
                                        <span>Date: </span>
                                        <span>{DayFormat(item.createdAt)}</span>
                                    </div>
                                    <div>
                                        <span>Note: </span>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Không có ghi chú gì"
                                            style={{ height: '100px' }}
                                            value={item.note}
                                            disabled
                                        />
                                    </div>
                                    <div className='d-flex align-items-start flex-column'>
                                        <span>Action </span>
                                        <div className='w-100 d-flex justify-content-between align-items-center'>
                                            <Button variant="danger">Huỷ Đơn Hàng</Button>
                                            <Button>Chuyển trạng thái đơn hàng</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
        </Container >
    )
}

export default Order