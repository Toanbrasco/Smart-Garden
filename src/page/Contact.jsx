import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'



function Contact() {
    const Map = 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'
    const [height, setHeight] = useState(0)
    // console.log(`=> height`, height)
    const ref = useRef(null)


    useEffect(() => {
        document.title = "Contact"
    }, []);

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })
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
                                <div className='d-flex flex-column p-3 bg-white  '>
                                    <span><strong>Dịa chỉ</strong></span>
                                    <span>1 abc, abc, abc, HCM</span>
                                    <span><strong>Email</strong></span>
                                    <span>ABc@gmail.com</span>
                                    <span><strong>Phone</strong></span>
                                    <span>012345679</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className=' mt-4' ref={ref}>
                    <h5 className='cursor-d'><strong>Liên hệ</strong></h5>
                    <small className='text-secondary'>Để lại thông tin chúng tôi sẽ liên hệ bạn</small>
                    <form action="" className='d-flex flex-column'>
                        <label className='mt-2 cursor-d'>Họ và tên</label>
                        <input type="text" className='input-cus mt-2' />

                        <label className='mt-2 cursor-d'>Email</label>
                        <input type="Email" className='input-cus mt-2' />

                        <label className='mt-2 cursor-d'>Số điện thoại</label>
                        <input type="text" className='input-cus mt-2' />

                    </form>
                    <div className="Btn-Payment w-25 mt-3 float-right cursor-p">
                        <span>Submit</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-center align-items-center mt-5 cursor-p'>
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