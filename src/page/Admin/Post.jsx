import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { images, DayFormat, convertViToEn, UrlApi } from '../../Constants.js'

import Loading from '../../Component/Loading/Loading.jsx'

import { PostContext } from '../../Contexts/PostContext'
import { ImageContext } from '../../Contexts/ImageContext.js'

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Post() {
    const { posts, getBlog, getService, deleteBlog, deleteService } = useContext(PostContext)
    const { deleteImage } = useContext(ImageContext)
    const [infoRemovePost, setInfoRemovePost] = useState({
        id: '',
        name: ''
    })
    console.log(`=> infoRemovePost`, infoRemovePost)
    const [typePost, setTypePost] = useState()
    const [modalText, setModalText] = useState('')
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    const handleConfirm = () => {
        setShow2(false)
        handleRemovePost(infoRemovePost.image, infoRemovePost.id)
    }

    const handleRemovePost = async (image, id) => {
        const { success, imageMessage } = await deleteImage([image])
        if (success) {
            switch (typePost) {
                case "BLOG":
                    const { blogSuccess, blogMessage } = await deleteBlog(id)
                    if (blogSuccess) {
                        setModalText(blogMessage)
                        setShow(true)
                    } else {
                        setModalText(blogMessage)
                        setShow(true)
                    }
                    break;

                case "SERVICE":
                    const { serviceSuccess, serviceMessage } = await deleteService(id)
                    if (serviceSuccess) {
                        setModalText(serviceMessage)
                        setShow(true)
                    } else {
                        setModalText(serviceMessage)
                        setShow(true)
                    }
                    break;

                default:
                    break;
            }
        } else {
            setModalText(imageMessage)
            setShow(true)
        }
    }
    // const handleRemovePost = (id, name, type) => {
    const confirmRemovePost = (id, name, type) => {
        switch (type) {
            case "BLOG":
                setTypePost("BLOG")
                setInfoRemovePost({ name: name, id: id })
                setShow2(true)
                break;


            case "SERVICE":
                setTypePost("SERVICE")
                setInfoRemovePost({ name: name, id: id })
                setShow2(true)
                break;

            default:
                break;
        }
    }
    const handleClose = () => {
        setShow(false)
        getBlog(0, 0)
        getService(0, 0)
    }

    useEffect(() => {
        document.title = "Post"
        getBlog(0, 0)
        getService(0, 0)
    }, [])

    if (posts.loadingBlog || posts.loadingService) {
        return <Loading />
    }

    return (
        <Container fluid bg="light">
            <Modal show={show} onHide={() => setShow(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={() => setShow2(false)} animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn xoá {typePost === "BLOG" ? 'bài viết' : 'dịch vụ'} {infoRemovePost.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Ok
                    </Button>
                    <Button variant="danger" onClick={() => setShow2(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3 ' >
                    <h3>Blog</h3>
                    <Button as={Link} to={`blog/upload`}>+</Button>
                </Col>
            </Row>
            <Row>
                {
                    posts.dataBlog.map((item, index) =>
                        <Col key={index} sm={6} lg={3} className='mt-3'>
                            <Card style={{ width: '100%' }} className='h-100 d-flex flex-column align-self-stretch flex-grow-1'>
                                <Card.Img variant="top" src={UrlApi + `/image/${item.image}`} />
                                <div className='mt-auto'>
                                    <Card.Body >
                                        <Card.Title style={{ fontSize: '15px' }} className='text-truncate'>{item.title}</Card.Title>
                                        <Card.Text className="text-truncate text-truncate--3 text-justify" >{item.desc}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className='mt-auto'>
                                        <div className="w-100 d-flex flex-xl-row flex-column justify-content-between align-items-center">
                                            <div className="w-100">
                                                <span>Ngày tạo:<br /> {DayFormat(item.createdAt)}</span>
                                            </div>
                                            <div className='w-100 d-flex justify-content-end'>
                                                <Button as={Link} to={`blog/${convertViToEn(item._id)}`} variant="primary" className=''><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                                <Button variant="danger" className='ml-2' onClick={() => confirmRemovePost(item._id, item.title, 'BLOG')}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </div>
                                        </div>
                                    </Card.Footer>
                                </div>
                            </Card>
                            {/* </Link> */}
                        </Col>
                    )
                }

            </Row>
            <Row>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3' >
                    <h3>Service</h3>
                    <Button as={Link} to={`service/upload`}>+</Button>
                </Col>
            </Row>
            <Row className='mb-5'>
                {
                    posts.dataService.map((item, index) =>
                        <Col key={index} sm={6} lg={3} className='mt-3'>
                            <Card style={{ width: '100%' }} className='h-100 d-flex flex-column align-self-stretch flex-grow-1'>
                                <Card.Img variant="top" className='w-100' src={UrlApi + `/image/${item.image}`} />
                                <div className='mt-auto'>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '15px' }} className='text-truncate'>{item.title}</Card.Title>
                                        <Card.Text className="text-truncate text-truncate--3 text-justify" >{item.desc}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className=''>
                                        <div className="w-100 d-flex flex-xl-row flex-column justify-content-between align-items-center">
                                            <div className="w-100">
                                                <span>Ngày tạo:<br /> {DayFormat(item.createdAt)}</span>
                                            </div>
                                            <div className='w-100 d-flex justify-content-end'>
                                                <Button as={Link} to={`service/${convertViToEn(item._id)}`} variant="primary" className=''><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                                <Button variant="danger" className='ml-2' onClick={() => confirmRemovePost(item._id, item.title, 'SERVICE')}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </div>
                                        </div>
                                    </Card.Footer>
                                </div>
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </Container >
    )
}

export default Post