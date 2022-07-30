import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { images } from '../../Constants.js'

function Post() {
    return (
        <Container fluid bg="light">
            {/* <Row className='mt-3'>
                <Col md={12} >
                    <h1>Post</h1>
                </Col>
            </Row> */}
            <Row>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3 ' >
                    <h3>Blog</h3>
                    <Button >+</Button>
                </Col>
                <Col lg={3}>
                    <Link to='blog-detail'>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={images[0]} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3' >
                    <h3>Service</h3>
                    <Button >+</Button>
                </Col>
                <Col lg={3}>
                    <Link to='blog-detail'>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={images[0]} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Post