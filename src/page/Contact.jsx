import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap'

import { ConfigContext } from '../Contexts/ConfigContext'
import Loading from '../Component/Loading/Loading';

function Contact() {
    const { config, getConfig } = useContext(ConfigContext)
    const Map = 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'
    const [height, setHeight] = useState(0)
    const Myref = useRef(null)

    useEffect(() => {
        document.title = "Contact"
        getConfig()
    }, []);

    useEffect(() => {
        setHeight(Myref.current.clientHeight)
    }, [Myref])
    if (config.loading) {
        return <Loading />
    }
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4 cursor-p'>
                    <span>Shop / Contact </span>
                </Col>
            </Row>
            <Row className=" d-flex">
                <Col md={8} className='mt-4' style={{ height: height }}>
                    <div className='position-relative w-100 h-100'>
                        <div className='w-100 h-100 position-absolute img-map'>
                            <img src={Map} alt="Map" className='w-100 h-100 ' />
                           
                        </div>
                        <div className='position-absolute w-100 h-100'>
                            <div className='d-flex flex-column h-100 justify-content-md-center map-infor'>
                                <div className='d-flex flex-column p-3 bg-white '>
                                    {
                                        config.data.info.map((item, index) => item.contact === true &&
                                            <div className='d-flex flex-column'>
                                                <strong>{item.title}</strong>
                                                <span className='mt-0'>{item.info}</span>
                                            </div>
                                        )
                                    }
                                    {/* <strong>Dịa chỉ</strong>
                                    <span>1 abc, abc, abc, HCM</span>
                                    <span><strong>Email</strong></span>
                                    <span>ABc@gmail.com</span>
                                    <span><strong>Phone</strong></span>
                                    <span>012345679</span> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className='mt-4 d-flex flex-column' ref={Myref}>
                    <h5 className='cursor-d'><strong>Liên hệ</strong></h5>
                    <small className='text-secondary'>Để lại thông tin chúng tôi sẽ liên hệ bạn</small>
                    <form action="" className='d-flex flex-column'>
                        <label className='mt-2 cursor-d'>Họ và tên</label>
                        <input type="text" className='input-cus ' />

                        <label className='mt-2 cursor-d'>Email</label>
                        <input type="Email" className='input-cus ' />

                        <label className='mt-2 cursor-d'>Số điện thoại</label>
                        <input type="text" className='input-cus ' />

                    </form>
                    <div className="mt-3 w-100 d-flex justify-content-end cursor-p">
                        <Button>Submit</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-center align-items-center my-5 cursor-p'>
                    <Link to='/' className="mx-1 text-dark">Home</Link>
                    <Link to='/Products' className="mx-1 text-dark">Product</Link>
                    {/* <a className="mx-1 text-dark">About</a> */}
                    <Link to='/Contact' className="mx-1 text-dark">Contact</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact