import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Blog() {
    useEffect(() => {
        document.title = "Blog"
    }, []);
    const BlogArr = [1, 2, 3, 4, 5, 6]
    const Img = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80'
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4'>
                    <span>Shop /<strong>Blog</strong></span>
                </Col>
            </Row>
            <Row>
                {
                    BlogArr.map((item, index) =>
                        <Col xs={6} lg={4} key={index} className='mt-4 '>
                            <Card style={{ width: '100%', border: 'none' }} className="cursor-p" >
                                <Card.Img variant="top" src={Img} className='shadow-sm' style={{ width: '100%', border: 'none' }} />
                                <Card.Body className='px-0'>
                                    <Card.Title><strong>Card Title{item}</strong></Card.Title>
                                    <Card.Text>Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Card.Link className='float-right text-dark'>Xem chi tiết</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
            </Row>
            <Row>
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
        </Container>
    )
}

export default Blog