import React, { useContext, useEffect, useState } from 'react'
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
    const { products, getProducts } = useContext(ProductContext)

    console.log(`=> products`, products)
    const [productsFill, setProductsFill] = useState([])


    const handleSelect = (value) => {
        if (value === '0') {
            setProductsFill(products.data)
        }
        if (value === '1') {
            const newFill = productsFill.sort((a, b) => Number(a.price.base) - Number(b.price.base));
            setProductsFill([...newFill])
            return
        }
        if (value === '2') {
            const newFill = productsFill.sort((a, b) => Number(b.price.base) - Number(a.price.base));
            setProductsFill([...newFill])
            return
        }
    }
    const handleCategory = (text) => {
        let newFill = []
        products.data.forEach((item, index) => {
            if (item.category.detail.includes(text) || item.category.main.includes(text)) {
                newFill.push(item)
            }
        })
        setProductsFill([...newFill])
    }

    useEffect(() => {
        document.title = "Products"
        getProducts()
        // 
        setProductsFill(products.data)
    }, []);

    console.log(`=> !productsFill`, productsFill)
    if (products.loading) {
        return <Loading />
    }
    return (
        <>
            {/* <Container fluid className='p-0 w-100 position-relative'>
                <Row className='p-0 w-100 m-0' style={{ zIndex: '-100' }}>
                    <Col className='p-0 w-100'>
                        <img className='p-0 w-100' src={Banner} alt="Banner" />
                    </Col>
                    <Col className='Banner__title w-100 h-100 position-absolute d-flex flex-column justify-content-center cursor-d' >
                        <h1>Smart Garden</h1>
                        <span>Chuyên cung cấp và thi công về thiết bị tưới tự động
                        </span>
                    </Col>
                </Row>
            </Container> */}
            <Container>
                <Row>
                    <Col md={4} className="mt-3 cursor-p d-none d-md-block">
                        <h5><strong>Category</strong></h5>
                        <div className='category__list' style={{ listStyle: 'none' }}>
                            {CategoryList.map((item, index) =>
                                <div key={index}>
                                    <h6 onClick={() => handleCategory(item.title)}>{item.title}</h6>
                                    {item.list.length !== 0 ?
                                        <ul className='mb-2'>
                                            {item.list.map((items, index) =>
                                                <li key={index} onClick={() => handleCategory(items)}>{items}</li>
                                            )}
                                        </ul>
                                        : <></>}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col md={4} className="mt-3 cursor-p d-block d-md-none">
                        <h5><strong>Category</strong></h5>
                        <div className='category__list' style={{ listStyle: 'none' }}>
                            <Swiper
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                {CategoryList.map((item, index) => item.list.length !== 0 &&
                                    <SwiperSlide key={index} >
                                        <div key={index} className='py-3'>
                                            <h6>{item.title}</h6>
                                            {item.list.length !== 0 ?
                                                <ul className='mb-2'>
                                                    {item.list.map((items, index) =>
                                                        <li key={index}>{items}</li>
                                                    )}
                                                </ul>
                                                : <></>}
                                        </div>
                                    </SwiperSlide>
                                )}
                                <SwiperSlide >
                                    {CategoryList.map((item, index) => item.list.length === 0 &&
                                        <div key={index} className="w-100 h-100" data-toggle="collapse" href={`#Collapse${index}`} role="button" aria-expanded="false" aria-controls={`Collapse${index}`}>
                                            <div className='d-flex justify-content-between align-items-center' >
                                                <h6>{item.title}</h6>
                                            </div>
                                        </div>
                                    )}
                                    {/* {item.list.length !== 0 ?
                                                <div className="collapsep-3" id={`Collapse${index}`}>
                                                    <ul className='mb-3'>
                                                        {item.list.map((items, index) =>
                                                            <li key={index}>{items}</li>
                                                        )}
                                                    </ul>
                                                </div>
                                                : <></>} */}
                                </SwiperSlide>
                            </Swiper>

                            {/* {CategoryList.map((item, index) =>
                                <div key={index}>
                                    <h6>{item.title}</h6>
                                    <ul className='mb-2'>
                                        {item.list.map((items, index) =>
                                            <li key={index}>{items}</li>
                                        )}
                                    </ul>
                                </div>
                            )} */}
                        </div>

                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={12}>
                                <div className="w-100 product__title d-flex justify-content-between mt-3">
                                    <h5><strong>Product</strong></h5>
                                    <div className='w-40 d-flex align-items-center justify-content-between'>
                                        <span><strong>Sort By: </strong> </span>
                                        <Form.Group controlId="ControlSelect2" className=''>
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
                                // index < 12 &&
                                productsFill.map((item, index) => index < 12 &&
                                    <Col xs={6} lg={4} key={index}>
                                        <Card as={Link} to={'/products/' + convertViToEn(item.name)} style={{ width: '100%', border: 'none' }} className='hover-sh cursor-p mt-3'>
                                            <Card.Img variant="top" className="p-4 bg-light" src={Bec} />
                                            <Card.Body className='px-3 text-center d-flex flex-column h-100'>
                                                <Card.Title style={{ fontSize: '15px' }} className="mb-1 text-truncate"><strong>{item.name}</strong></Card.Title>
                                                <Card.Text className="text-danger mt-auto"><strong>{numberFormat(item.price.base)}</strong></Card.Text>
                                                {/* <Card.Link href="#" className='float-right text-dark'>Card Link</Card.Link> */}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                            <Col md={12} className="d-flex justify-content-center mt-3">
                                <div className="btn-nav"><strong><FontAwesomeIcon icon={faAngleLeft} /> </strong></div>
                                <div className="btn-nav"><span>1</span></div>
                                <div className="btn-nav"><span>2</span></div>
                                <div className="btn-nav active"><span>3</span></div>
                                <div className="btn-nav"><span>4</span></div>
                                <div className="btn-nav"><span>5</span></div>
                                <div className="btn-nav"><strong><FontAwesomeIcon icon={faAngleRight} /> </strong></div>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Product