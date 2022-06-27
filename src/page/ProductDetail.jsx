import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Bec from '../assets/images/BEC-TR.png'

import '../style/Product.css'

function ProductDetail() {
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4'>
                    <span>Shop / Products / <strong>Béc tưới abc xyz 123456</strong></span>
                </Col>
                <Col md={6}>
                    <img src={Bec} className='w-100 p-5' alt="Bec" />
                    <div></div>
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
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-center align-items-center mt-5'>
                    <span>Sản phẩm tương tự</span>
                </Col>
                <Col md={12}>
                    <Row>
                        {
                            [1, 2, 3, 4, 5, 6].map((item) =>
                                <Col md={4} lg={2} key={item}>
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
        </Container>
    )
}

export default ProductDetail