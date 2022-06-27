import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Service() {
    const ServiceArr = [1, 2, 3]
    const Img = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80'
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4 cursor-p'>
                    <span>Shop /<strong> Service</strong></span>
                </Col>
            </Row>
            {
                ServiceArr.map((item, index) =>
                    <Row key={index} className='mt-5'>
                        <Col md={6}>
                            <img src={Img} alt="Img" className='w-100 h-100 ' />
                        </Col>
                        <Col md={6}>
                            <Card style={{ width: '100%', border: 'none' }} className="cursor-p h-100" >
                                {/* <Card.Img variant="top" src={Img} className='shadow-sm w-50 ' /> */}
                                <Card.Body className='p-0 h-100 d-flex flex-column'>
                                    <Card.Title><strong>Card Title{item}</strong></Card.Title>
                                    <Card.Text>Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Card.Link href="#" className='text-right text-dark mt-auto'>Xem chi tiết</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            }
            <Row>
                <Col md={12} className="d-flex justify-content-center mt-5">
                    <div className="btn-nav"><strong><FontAwesomeIcon icon={faAngleLeft} /> </strong></div>
                    <div className="btn-nav"><span>1</span></div>
                    <div className="btn-nav"><span>2</span></div>
                    <div className="btn-nav active"><span>3</span></div>
                    <div className="btn-nav"><span>4</span></div>
                    <div className="btn-nav"><span>5</span></div>
                    <div className="btn-nav"><strong><FontAwesomeIcon icon={faAngleRight} /> </strong></div>
                </Col>

            </Row>
        </Container>
    )
}

export default Service