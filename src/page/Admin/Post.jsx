import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import Loading from '../../Component/Loading/Loading.jsx'
import { images, DayFormat, convertViToEn } from '../../Constants.js'
import { PostContext } from '../../Contexts/PostContext'

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Post() {
    const { posts, getBlog, getService } = useContext(PostContext)
    // console.log(`=> post`, posts)

    const handleRemoveUser = () => {

    }

    useEffect(() => {
        getBlog(0, 0)
        getService(0, 0)
    }, [])

    if (posts.loadingBlog || posts.loadingService) {
        return <Loading />
    }

    return (
        <Container fluid bg="light">
            <Row>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3 ' >
                    <h3>Blog</h3>
                    <Button >+</Button>
                </Col>
            </Row>
            <Row>
                {
                    posts.dataBlog.map((item, index) =>
                        <Col key={index} sm={6} lg={3} className='mt-3'>
                            {/* <Link to='blog-detail'> */}
                            <Card style={{ width: '100%' }} className='d-flex flex-column align-self-stretch flex-grow-1'>
                                <Card.Img variant="top" src={images[0]} />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '15px' }} className='text-truncate'>{item.title}</Card.Title>
                                    <Card.Text className="text-truncate text-truncate--2" >{item.desc}</Card.Text>
                                </Card.Body>
                                <Card.Footer className='mt-auto'>
                                    <div className="w-100 d-flex justify-content-between align-items-center mt-auto">
                                        <span>Ngày tạo:<br /> {DayFormat(item.createdAt)}</span>
                                        <div>
                                            <Button as={Link} to={`blog/${convertViToEn(item.title)}`} variant="primary" className=''><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                            <Button variant="danger" className='ml-2' onClick={() => handleRemoveUser(item._id, 'SHOW_MODAL')}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </div>
                                    </div>
                                </Card.Footer>
                            </Card>
                            {/* </Link> */}
                        </Col>
                    )
                }
                <Col sm={6} lg={3} className='mt-3'>
                    <Link to='blog-detail'>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" className='w-100' src={images[0]} />
                            <Card.Body>
                                <Card.Title>test</Card.Title>
                                <Card.Text>test</Card.Text>
                            </Card.Body>

                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3' >
                    <h3>Service</h3>
                    <Button >+</Button>
                </Col>
            </Row>
            <Row className='mb-5'>
                {
                    posts.dataService.map((item, index) =>
                        <Col key={index} sm={6} lg={3} className='mt-3'>
                                <Card style={{ width: '100%' }} className='d-flex flex-column align-self-stretch flex-grow-1'>
                                    <Card.Img variant="top" className='w-100' src={images[0]} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '15px' }} className='text-truncate'>{item.title}</Card.Title>
                                        <Card.Text className="text-truncate text-truncate--2" >{item.desc}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className="w-100 d-flex justify-content-between align-items-center">
                                            <span>Ngày tạo:<br /> {DayFormat(item.createdAt)}</span>
                                            <div>
                                                <Button as={Link} to={`service/${convertViToEn(item.title)}`} variant="primary" className=''><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                                <Button variant="danger" className='ml-2' onClick={() => handleRemoveUser(item._id, 'SHOW_MODAL')}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </div>
                                        </div>
                                    </Card.Footer>
                                </Card>
                        </Col>
                    )
                }
            </Row>
        </Container >
    )
}

export default Post