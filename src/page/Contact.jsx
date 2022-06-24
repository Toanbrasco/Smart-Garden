import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Banner from '../assets/images/Banner.png'
import Bec from '../assets/images/BEC-TR.png'
import ONG from '../assets/images/ThungOng.png'


function Contact() {
    const Map = 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4'>
                    <span>Shop / Contact </span>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={5}>
                    <h5><strong>Liên hệ</strong></h5>
                    <form action="" className='d-flex flex-column '>
                        <lable className='mt-2'>Họ và tên</lable>
                        <input type="text" className='input-cus mt-2' />
                        <lable className='mt-2'>Email</lable>
                        <input type="Email" className='input-cus mt-2' />
                        <lable className='mt-2'>Số điện thoại</lable>
                        <input type="text" className='input-cus mt-2' />
                    </form>
                    <div className="Btn-Payment w-25 mt-3 float-right">
                        <span>Submit</span>
                    </div>
                </Col>
                <Col md={7} className='position-relative'>
                    <img src={Map} alt="Map" className='w-100 h-100 position-absolute' />
                    <div className='position-absolute w-100 h-100 '>
                        <div className='d-flex flex-column h-100 justify-content-center ml-3'>
                            <div className='d-flex flex-column p-3 bg-white map-infor'>
                                <span><strong>Dịa chỉ</strong></span>
                                <span>1 abc, abc, abc, HCM</span>
                                <span><strong>Email</strong></span>
                                <span>ABc@gmail.com</span>
                                <span><strong>Phone</strong></span>
                                <span>012345679</span>
                            </div>

                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-center align-items-center mt-5'>
                    <a className="mx-1 text-dark">Home</a>
                    <a className="mx-1 text-dark">Product</a>
                    <a className="mx-1 text-dark">About</a>
                    <a className="mx-1 text-dark">Contact</a>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact