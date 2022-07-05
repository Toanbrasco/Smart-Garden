import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Bec from '../assets/images/BEC-TR.png'

import '../style/Product.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// SwiperCore.use([Navigation]);

function ProductDetail() {
    const pdArr = [1, 2, 3, 4, 5, 6]
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const images = [
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60']

    useEffect(() => {
        document.title = "Product"
    }, []);

    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4'>
                    <span>Shop / Products / <strong>Béc tưới abc xyz 123456</strong></span>
                </Col>
                <Col md={6}>
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2 w-100"
                    >
                        {
                            images.map((item, index) =>
                                <SwiperSlide key={index}>
                                    <img src={item} alt="images" className='w-100' />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper mt-3"
                    >
                        {
                            images.map((item, index) =>
                                <SwiperSlide key={index}>
                                    <img src={item} alt="images" className='w-100' />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </Col>
                <Col md={6} className='d-flex flex-column'>
                    <h5>Béc tưới abc xyz 123456</h5>
                    <span className='text-danger'>123.123.123 VND</span>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Et rerum quis tenetur expedita quaerat at excepturi nobis qui obcaecati ad.
                        Non ipsa sed, similique veniam assumenda architecto dolore sit dicta.</p>
                    <div className="parameter">

                    </div>
                    <div className='addToCart mt-auto'>
                        <span>Add To Cart</span>

                    </div>
                </Col>
            </Row >
            <Row>
                <Col md={12} className='d-flex justify-content-center align-items-center mt-5'>
                    <span>Sản phẩm tương tự</span>
                </Col>
                <Col md={12}>
                    <Row>
                        {
                            pdArr.map((item) =>
                                <Col xs={6} md={4} lg={2} key={item}>
                                    <Card style={{ width: '100%', border: 'none' }} className='hover-sh cursor-p mt-3'>
                                        <Card.Img variant="top" className="p-4 bg-light" src={Bec} />
                                        <Card.Body className='p-2 text-center'>
                                            <Card.Title style={{ fontSize: '15px' }} className="mb-1"><strong>Béc tưới 1234567890</strong></Card.Title>
                                            <Card.Text className="text-danger" style={{ fontSize: '15px' }}><strong>123.123.123 VND</strong></Card.Text>
                                            {/* <Card.Link href="#" className='float-right text-dark'>Card Link</Card.Link> */}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
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
        </Container >
    )
}

export default ProductDetail