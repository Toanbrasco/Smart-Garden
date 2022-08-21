import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import Bec from '../assets/images/BEC-TR.png'
import '../style/Product.css'

import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { convertViToEn, numberFormat, CategoryList, makeNumArr } from '../Constants.js'
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
    const { products, getProducts, handleCategory, productSearch, refeshProduct } = useContext(ProductContext)
    const limit = 12
    const { totalPage } = products.pagination

    const [pagingActive, setPagingActive] = useState(1)
    const [itemCenter, SetitemCenter] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || ''
    const category = searchParams.get('category')
    console.log(`=> category`, category)
    const search = searchParams.get('search')

    const [selectValue, setSelectValue] = useState(0)


    const handleCategoryProduct = (category) => {
        handleCategory(category, pagingActive, limit, parseInt(selectValue))
        // setSelectValue(0)
    }

    const handlePageParam = (num) => {
        if (category !== null) {
            switch (num) {
                case -1:
                    setSearchParams({ category: category, page: pagingActive - 1 || 1 })
                    break;
                case 1:
                    setSearchParams({ category: category, page: pagingActive + 1 || 1 })
                    break;
                default:
                    break;
            }
        } else {
            if (search !== null) {
                switch (num) {
                    case -1:
                        setSearchParams({ search: search, page: pagingActive - 1 || 1 })
                        break;
                    case 1:
                        setSearchParams({ search: search, page: pagingActive + 1 || 1 })
                        break;
                    default:
                        break;
                }
            } else {
                switch (num) {
                    case -1:
                        setSearchParams({ page: pagingActive - 1 || 1 })
                        break;
                    case 1:
                        setSearchParams({ page: pagingActive + 1 || 1 })
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const handleQueryParam = (num) => {
        if (category !== null) {
            setSearchParams({ category: category, page: num })
        } else {
            if (search !== null) {
                setSearchParams({ search: search, page: num })
            } else {
                setSearchParams({ page: num })
            }
        }
    }

    useEffect(() => {
        if (category !== null) {
            handleCategory(category, page || 1, limit, parseInt(selectValue))
        } else {
            if (search !== null) {
                productSearch(search, page || 1, limit, parseInt(selectValue))
            } else {
                getProducts(parseInt(page) || 1, limit, parseInt(selectValue))
            }
        }
    }, [selectValue])

    useEffect(() => {
        document.title = "Products"
        if (search !== null) {
            productSearch(search, page || 1, limit, parseInt(selectValue))
        } else {
            getProducts(parseInt(page) || 1, limit, parseInt(selectValue))
        }
    }, []);

    useEffect(() => {
        if (search !== null) {
            productSearch(search, page || 1, limit, parseInt(selectValue))
        }
    }, [search])

    useEffect(() => {
        setPagingActive(parseInt(page) || 1)
        SetitemCenter(parseInt(page) || 1)
        if (category !== null) {
            handleCategory(category, page || 1, limit, parseInt(selectValue))
        } else {
            if (search !== null) {
                productSearch(search, page || 1, limit, parseInt(selectValue))
            } else {
                getProducts(parseInt(page) || 1, limit, parseInt(selectValue))
            }
        }
    }, [page])

    if (products.loading) {
        return <Loading />
    }
    return (
        <>
            <Container>
                <Row>
                    <Col lg={3} className="mt-3 cursor-d d-none d-lg-block">
                        <h5><strong>Category</strong></h5>
                        <div className='category__list cursor-p' style={{ listStyle: 'none' }}>
                            {CategoryList.map((item, index) =>
                                <div key={index}>
                                    <Link to={`/products?category=${item.title}&page=1`}>
                                        <h6 className={category === item.title ? 'text-primary font-weight-bold' : ''} onClick={() => handleCategoryProduct(item.title)}>{item.title}</h6>
                                    </Link>
                                    {item.list.length !== 0 ?
                                        <ul className='mb-2'>
                                            {
                                                item.list.map((items, index) =>
                                                    <Link to={`/products?category=${items}&page=1`}>
                                                        <li key={index} className={category === items ? 'text-primary font-weight-bold' : 'text-dark'} onClick={() => handleCategoryProduct(items)}>{items}</li>
                                                    </Link>
                                                )
                                            }
                                        </ul>
                                        : <></>}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col lg={3} className="mt-3 cursor-d d-block d-lg-none">
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
                                                <Link to={`/products?category=${item.title}&page=1`}>
                                                    <h6 className={category === item.title ? 'text-primary font-weight-bold' : ''} onClick={() => handleCategoryProduct(item.title)}>{item.title}</h6>
                                                </Link>
                                                {item.list.length !== 0 ?
                                                    <ul className='mb-2'>
                                                        {
                                                            item.list.map((items, index) =>
                                                                <Link to={`/products?category=${items}&page=1`}>
                                                                    <li key={index} className={category === items ? 'text-primary font-weight-bold' : 'text-dark'} onClick={() => handleCategoryProduct(items)}>{items}</li>
                                                                </Link>
                                                            )
                                                        }
                                                    </ul>
                                                    : <></>}
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                                <SwiperSlide className='py-3'>
                                    {CategoryList.map((item, index) => item.list.length === 0 &&
                                        <div key={index} className="w-100 h-100" data-toggle="collapse" href={`#Collapse${index}`} role="button" aria-expanded="false" aria-controls={`Collapse${index}`}>
                                            <div className='d-flex justify-content-between align-items-center' >
                                                <Link to={`/products?category=${item.title}&page=1`}>
                                                    <h6 className={category === item.title ? 'text-primary font-weight-bold' : ''} onClick={() => handleCategoryProduct(item.title)}>{item.title}</h6>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <Row>
                            <Col md={12}>
                                <div className="w-100 product__title d-flex justify-content-between mt-3 cursor-d">
                                    <Link to="/products" className='d-flex align-items-center justify-content-between'><h5 className='m-0' onClick={() => getProducts(1, limit, selectValue)}><strong>Product</strong></h5></Link>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <span><strong>Sort By: </strong> </span>
                                        <Form.Group controlId="ControlSelect2" className='cursor-p ml-2'>
                                            <Form.Control as="select" aria-label="Default select example" defaultValue={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                                                <option value="0">Mặt định</option>
                                                <option value="1">Giá tăng dần</option>
                                                <option value="2">Giá giảm dần</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Col>
                            {
                                products.data.map((item, index) => index < 12 &&
                                    <Col xs={6} md={4} lg={4} key={index}>
                                        <Card as={Link} to={'/product/' + convertViToEn(item.name)} style={{ width: '100%', border: 'none' }} className='hover-sh cursor-p mt-3'>
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
                                search !== null ?
                                    <Col md={12} className=' mt-3'>
                                        <div className="w-100 d-flex p-3 flex-column justify-content-center align-items-center bg-light rounded text-center" style={{ width: '100%', height: '250px' }}>
                                            <h5 className="mb-1 text-center">Không tìm thấy sản phẩm</h5>
                                            <p style={{ fontSize: '18px' }}>Vui lòng chọn các loại sản phẩm khác hoặc <span style={{ fontSize: '18px' }} onClick={() => getProducts(1, limit, selectValue)} className='cursor-p text-primary'>xem tất cả sản phẩm</span></p>
                                        </div>
                                    </Col> :
                                    <Col md={12} className=' mt-3'>
                                        <div className="w-100 d-flex p-3 flex-column justify-content-center align-items-center bg-light rounded text-center" style={{ width: '100%', height: '250px' }}>
                                            <h5 className="mb-1 text-center">Hiện chúng tôi Không còn sản phẩm nào loại này</h5>
                                            <p className='text-center' style={{ fontSize: '18px' }}>Vui lòng chọn các loại sản phẩm khác hoặc <span style={{ fontSize: '18px' }} onClick={() => getProducts(1, limit, selectValue)} className='cursor-p text-primary'>xem tất cả sản phẩm</span></p>
                                        </div>
                                    </Col> :
                                <Col md={12} className="d-flex justify-content-center mt-3 mb-5">
                                    <div onClick={() => handlePageParam(-1)} className={1 === pagingActive ? "d-none" : "btn-nav hover-sh"} ><strong><FontAwesomeIcon icon={faAngleLeft} /> </strong></div>
                                    <div onClick={() => handleQueryParam(1)} className={1 + 2 >= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{1}</span></div>
                                    <div className={pagingActive <= 3 ? "d-none" : "btn-nav"}><span>...</span></div>
                                    {
                                        makeNumArr(totalPage).map((item, index) => item <= (itemCenter + 2) && item >= (itemCenter - 2) &&
                                            <div key={index} onClick={() => handleQueryParam(item)} className={pagingActive === item ? "btn-nav active" : "btn-nav hover-sh"}><span>{item}</span></div>
                                        )
                                    }
                                    <div className={totalPage - 2 <= pagingActive ? "d-none" : "btn-nav "}><span>...</span></div>
                                    <div onClick={() => handleQueryParam(totalPage)} className={totalPage - 2 <= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{totalPage}</span></div>
                                    <div onClick={() => handlePageParam(1)} className={totalPage === pagingActive ? "d-none" : "btn-nav hover-sh"} ><strong><FontAwesomeIcon icon={faAngleRight} /> </strong></div>
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