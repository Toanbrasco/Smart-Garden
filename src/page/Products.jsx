import React, { useContext, useEffect } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import Bec from '../assets/images/BEC-TR.png'
import '../style/Product.css'

import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { convertViToEn, numberFormat, CategoryList } from '../Constants.js'
import Loading from '../Component/Loading/Loading.jsx'

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { ProductContext } from '../Contexts/ProductContext'

function Product() {
    const { products, getProducts, handleSelect, handleCategory } = useContext(ProductContext)
    // console.log(`=> products_main`, products)

    useEffect(() => {
        document.title = "Products"
        // console.log('getPRoduct')
        getProducts()
    }, []);

    if (products.loading) {
        return <Loading />
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={4} className="mt-3 cursor-d d-none d-md-block">
                        <h5><strong>Category</strong></h5>
                        <div className='category__list cursor-p' style={{ listStyle: 'none' }}>
                            {CategoryList.map((item, index) =>
                                <div key={index}>
                                    <h6 onClick={() => handleCategory(item.title)}>{item.title}</h6>
                                    {item.list.length !== 0 ?
                                        <ul className='mb-2'>
                                            {
                                                item.list.map((items, index) =>
                                                    <li key={index} onClick={() => handleCategory(items)}>{items}</li>
                                                )
                                            }
                                        </ul>
                                        : <></>}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col md={4} className="mt-3 cursor-d d-block d-md-none">
                        <h5><strong>Category</strong></h5>
                        <div className='category__list cursor-p' style={{ listStyle: 'none' }}>
                            <Swiper spaceBetween={30}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                className="mySwiper">
                                {
                                    CategoryList.map((item, index) => item.list.length !== 0 &&
                                        <SwiperSlide key={index} >
                                            <div key={index} className='py-3'>
                                                <h6 onClick={() => handleCategory(item.title)}>{item.title}</h6>
                                                {item.list.length !== 0 ?
                                                    <ul className='mb-2'>
                                                        {item.list.map((items, index) =>
                                                            <li key={index} onClick={() => handleCategory(items)}>{items}</li>
                                                        )}
                                                    </ul>
                                                    : <></>}
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                                <SwiperSlide>
                                    {CategoryList.map((item, index) => item.list.length === 0 &&
                                        <div key={index} className="w-100 h-100" data-toggle="collapse" href={`#Collapse${index}`} role="button" aria-expanded="false" aria-controls={`Collapse${index}`}>
                                            <div className='d-flex justify-content-between align-items-center' >
                                                <h6>{item.title}</h6>
                                            </div>
                                        </div>
                                    )}
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={12}>
                                <div className="w-100 product__title d-flex justify-content-between mt-3 cursor-d">
                                    <h5><strong>Product</strong></h5>
                                    <div className=' d-flex align-items-center justify-content-between'>
                                        <span><strong>Sort By: </strong> </span>
                                        <Form.Group controlId="ControlSelect2" className='cursor-p ml-2'>
                                            <Form.Control as="select" aria-label="Default select example" onChange={(e) => handleSelect(e.target.value)}>
                                                <option value="0">Mặt định</option>
                                                <option value="1">Giá tăng dần</option>
                                                <option value="2">Giá giảm dần</option>
                                                {/* <option value="3">Tên A - Z </option>
                                            <option value="4">Tên Z - A</option> */}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Col>
                            {
                                products.data.map((item, index) => index < 12 &&
                                    <Col xs={6} lg={4} key={index}>
                                        <Card as={Link} to={'/products/' + convertViToEn(item.name)} style={{ width: '100%', border: 'none' }} className='hover-sh cursor-p mt-3'>
                                            <Card.Img variant="top" className="p-4 bg-light" src={Bec} />
                                            <Card.Body className='px-3 text-center d-flex flex-column h-100'>
                                                <Card.Title style={{ fontSize: '15px' }} className="mb-1 text-truncate"><strong>{item.name}</strong></Card.Title>
                                                <Card.Text className="text-danger mt-auto"><strong>{numberFormat(item.price.base)}</strong></Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                            {products.data.length === 0 ?
                                <Col xs={12} lg={12} className=' mt-3'>
                                    <div className="w-100 d-flex flex-column justify-content-center align-items-center bg-light rounded" style={{ width: '100%', height: '250px' }}>
                                        <h5 className="mb-1 text-truncate">Hiện chúng tôi Không còn sản phẩm nào loại này</h5>
                                        <p style={{ fontSize: '18px' }}>Vui lòng chọn các loại sản phẩm khác hoặc <span style={{ fontSize: '18px' }} onClick={() => getProducts()} className='cursor-p text-primary'>xem tất cả sản phẩm</span></p>
                                    </div>
                                    {/* <Card style={{ width: '100%', height: '300px', border: 'none' }} className='cursor-d mt-3 bg-light'>
                                        <Card.Body className='px-3 text-center d-flex flex-column h-100'>
                                            <Card.Title style={{ fontSize: '15px' }} className="mb-1 text-truncate">Hiện chúng tôi Không còn sản phẩm nào loại này</Card.Title>
                                            <Card.Text className="">Vui lòng chọn các loại sản phẩm khác hoặc <span onClick={() => getProducts()} className='cursor-p text-primary'>xem tất cả sản phẩm</span></Card.Text>
                                        </Card.Body>
                                    </Card> */}
                                </Col>
                                :
                                <Col md={12} className="d-flex justify-content-center mt-3">
                                    <div className="btn-nav"><strong><FontAwesomeIcon icon={faAngleLeft} /> </strong></div>
                                    <div className="btn-nav"><span>1</span></div>
                                    <div className="btn-nav"><span>2</span></div>
                                    <div className="btn-nav active"><span>3</span></div>
                                    <div className="btn-nav"><span>4</span></div>
                                    <div className="btn-nav"><span>5</span></div>
                                    <div className="btn-nav"><strong><FontAwesomeIcon icon={faAngleRight} /> </strong></div>
                                </Col>
                            }

                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Product