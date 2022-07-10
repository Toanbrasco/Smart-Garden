import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import Bec from '../assets/images/BEC-TR.png'

import '../style/Product.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

import Products from '../assets/Data/test.json'
import { convertViToEn, numberFormat, images } from '../Constants.js'

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


function ProductDetail() {
    const { productname } = useParams()
    const [product, setProduct] = useState({})
    const products = [...Products]
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // const Location = useLocation().pathname
    // console.log(`=> Location`, Location)

    useEffect(() => {
        document.title = "Product"
        products.forEach((item) => {
            if (convertViToEn(item.name) === productname) {
                setProduct({ ...item })
            }
        })
    }, []);

    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4'>
                    <span>Shop / Product / <strong>{product.name}</strong></span>
                </Col>
                <Col md={6} className='mt-3'>
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
                                <SwiperSlide key={'img' + index}>
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
                                <SwiperSlide key={'img2' + index}>
                                    <img src={item} alt="images" className='w-100' />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </Col>
                <Col md={6} className='d-flex flex-column mt-3'>
                    <h5>{product.name}</h5>
                    <span className='text-danger'>{numberFormat(product.price)}</span>
                    <p>{product.desc}</p>
                    <div className="parameter">

                    </div>
                    <div className='addToCart mt-auto cursor-p'>
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
                            products.map((item, index) => index < 6 &&
                                <Col xs={6} md={4} lg={2} key={'product' + item.name}>
                                    <Card style={{ width: '100%', border: 'none' }} className='hover-sh cursor-p mt-3'>
                                        <Card.Img variant="top" className="p-4 bg-light" src={Bec} />
                                        <Card.Body className='p-2 text-center'>
                                            <Card.Title style={{ fontSize: '15px' }} className="mb-1"><strong>{item.name}</strong></Card.Title>
                                            <Card.Text className="text-danger" style={{ fontSize: '15px' }}><strong>{numberFormat(item.price.base)}</strong></Card.Text>
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