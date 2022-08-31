import React, { useState, useContext, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import JoditEditor from 'jodit-react';
import { UrlApi } from '../../Constants';

import Loading from '../../Component/Loading/Loading';
import Dropzone from '../../Component/Dropzone/Dropzone';

import { PostContext } from '../../Contexts/PostContext'
import { ImageContext } from '../../Contexts/ImageContext';

function PostEdit() {
    const { posts, refeshPost, postDispatch, updateBlog, updateService } = useContext(PostContext)
    const { updateImage } = useContext(ImageContext)
    const POST_GET_FAIL = 'POST_GET_FAIL'
    const SERVICE_DETAIL = 'SERVICE_DETAIL'
    const { idBlog, idService } = useParams()
    const Location = useLocation().pathname

    const [imageOld, setimageOld] = useState([])
    console.log(`=> imageOld`, imageOld)
    const [show, setShow] = useState(false)
    const [modalText, setModalText] = useState('')
    const [titleUpload, setTitleUpload] = useState('')
    const [content, setContent] = useState('')
    const [validFiles, setValidFiles] = useState([])
    console.log(`=> validFiles`, validFiles)
    const [postForm, setPostForm] = useState({
        title: '',
        desc: '',
        isPublic: false,
    })
    console.log(`=> postForm`, postForm)

    const editor = useRef(null);
    const config = {
        readonly: false,
        height: 'auto',
        placeholder: 'Nội dung...'
    }
    const handlePostForm = (e) => {
        setPostForm({ ...postForm, [e.target.name]: e.target.value })
    }
    const handleChecked = e => setPostForm({ ...postForm, [e.target.name]: e.target.checked })

    const getBlogDetail = async (idBlog) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/blog/id?id=${idBlog}`)
            console.log(`=> response Detail`, response.data)
            if (response.data.success) {
                setPostForm(response.data.data[0])
                setContent(response.data.data[0].content)
                setimageOld([response.data.data[0].image])
                postDispatch({ type: SERVICE_DETAIL, payload: response.data })
            } else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const getServiceDetail = async (idService) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/service/id?id=${idService}`)
            if (response.data.success) {
                setPostForm(response.data.data[0])
                setContent(response.data.data[0].content)
                setimageOld([response.data.data[0].image])
                postDispatch({ type: SERVICE_DETAIL, payload: response.data })
            } else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const handleSubmit = async () => {
        if (postForm.title.length > 5) {
            if (imageOld.length !== 0 && validFiles.length === 0 || imageOld.length === 0 && validFiles.length !== 0) {
                if (validFiles.length < 2) {
                    const data = new FormData()
                    Array.from(validFiles).forEach(item => {
                        data.append('file', item)
                    })
                    data.append('Old', [postForm.image])
                    data.append('New', imageOld)
                    const { imageSuccess, images, imageMessage } = await updateImage(data)
                    if (imageSuccess) {
                        if (Location.includes('/blog/')) {
                            const { blogSuccess, blogMessage } = await updateBlog({ ...postForm, image: images[0], content: content })
                            if (blogSuccess) {
                                setModalText(blogMessage)
                                setShow(true)
                            } else {
                                setModalText(blogMessage)
                                setShow(true)
                            }
                        } else {
                            const { serviceSuccess, serviceMessage } = await updateService({ ...postForm, image: images[0], content: content })
                            if (serviceSuccess) {
                                setModalText(serviceMessage)
                                setShow(true)
                            } else {
                                setModalText(serviceMessage)
                                setShow(true)
                            }
                        }
                    } else {
                        setModalText(imageMessage)
                        setShow(true)
                    }
                } else {
                    setModalText('Chỉ được được phép upload 1 tấm ảnh')
                    setShow(true)
                }
            } else {
                setModalText('Chỉ được được phép upload 1 tấm ảnh')
                setShow(true)
            }
        } else {
            setModalText('Tên quá ngắn')
            setShow(true)
        }
    }
    const handleCloseModal = () => {
        setShow(false)
        if (Location.includes('/blog/')) {
            getBlogDetail(idBlog)
        } else {
            getServiceDetail(idService)
        }
    }

    useEffect(() => {
        if (Location.includes('/blog/')) {
            document.title = "Blog"
            setTitleUpload('Blog')
            getBlogDetail(idBlog)
        } else {
            document.title = "Service"
            setTitleUpload('Service')
            getServiceDetail(idService)
        }
    }, []);

    if (posts.loadingBlog && posts.loadingService) return <Loading />
    return (
        <Container fluid>
            <Modal show={show} onHide={() => setShow(false)} animation={false} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseModal()}>
                        Ok
                    </Button>
                    {/* <Button variant="primary" onClick={() => setShow(false)}>
                Save Changes
            </Button> */}
                </Modal.Footer>
            </Modal>
            <Row className='mb-5'>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3' >
                    <h3>{titleUpload} Update</h3>
                </Col>
                <Col md={12}>
                    <Dropzone validFiles={validFiles} handleValidFiles={(files) => setValidFiles(files)}
                        upload={handleSubmit} imgOld={imageOld} updateImgOld={(img) => setimageOld(img)} btn={false} />
                </Col>
                <Col md={12}>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control type="text" placeholder="Tên bài viết" name='title' defaultValue={postForm.title} onChange={handlePostForm} />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>Mô tả bài viết</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Mô tả bài viết"
                            style={{ height: '200px' }}
                            defaultValue={postForm.desc}
                            name='desc'
                            onChange={handlePostForm}
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="my-3">
                        <Form.Label>Nội dung bài viết</Form.Label>
                    </Form.Group>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => { }}
                    />
                </Col>
                <Col md={12}>
                    <Form.Group className="my-3">
                        <Form.Check type="checkbox" label="isPublic" name='isPublic' defaultChecked={postForm.isPublic} onChange={handleChecked} />
                    </Form.Group>
                    <Button onClick={handleSubmit}>Update</Button>
                </Col>
            </Row>

        </Container>
    )
}

export default PostEdit