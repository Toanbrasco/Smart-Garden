import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Banner from '../assets/images/Banner.png'
import Bec from '../assets/images/BEC-TR.png'
import ONG from '../assets/images/ThungOng.png'
import '../style/Product.css'

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Product() {
    return (
        <>
            <Container fluid className='p-0 w-100 position-relative'>
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
            </Container>
            <Container>
                <Row>
                    <Col md={2} className="mt-3">
                        <h5><strong>Category</strong></h5>
                        <div className='category__list' style={{ listStyle: 'none' }}>
                            <ul>
                                <li>Items</li>
                                <li>Items</li>
                                <li>Items</li>
                                <li>Items</li>
                                <li>Items</li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={10} >
                        <Row>
                            <Col md={12}>
                                <div className="product__title d-flex justify-content-between mt-3">
                                    <h5><strong>Product</strong></h5>
                                    <span><strong>Sort By: </strong>Giảm</span>
                                </div>
                            </Col>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) =>
                                    <Col md={6} lg={4} key={item}>
                                        <Card style={{ width: '100%', border: 'none' }} className='hover-sh cursor-p mt-3'>
                                            <Card.Img variant="top" className="p-4 bg-light" src={Bec} />
                                            <Card.Body className='px-3 text-center'>
                                                <Card.Title style={{ fontSize: '20px' }} className="mb-1"><strong>Béc tưới 1234567890</strong></Card.Title>
                                                <Card.Text className="text-danger"><strong>123.123.123 VND</strong></Card.Text>
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
            </Container>
        </>
    )
}

export default Product