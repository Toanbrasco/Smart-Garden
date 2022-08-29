import React, { useState, useContext, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom';

import JoditEditor from 'jodit-react';

import { PostContext } from '../../Contexts/PostContext'
import { ImageContext } from '../../Contexts/ImageContext';

import Loading from '../../Component/Loading/Loading';
import Dropzone from '../../Component/Dropzone/Dropzone';

function UploadPost() {
    const { posts, getBlogDetail, getServiceDetail, blogAdd, serviceAdd } = useContext(PostContext)
    const { addImage } = useContext(ImageContext)
    const Location = useLocation().pathname

    const [titleUpload, setTitleUpload] = useState('')
    const [show, setShow] = useState(false)
    const [modalText, setModalText] = useState('')

    const [content, setContent] = useState('')
    const [validFiles, setValidFiles] = useState([])
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

    const handleSubmit = async () => {
        if (postForm.title.length > 5) {
            if (validFiles.length !== 0) {
                if (validFiles.length < 2) {
                    const data = new FormData()
                    Array.from(validFiles).forEach(item => {
                        data.append('file', item)
                    })
                    const { imageSuccess, images, imageMessage } = await addImage(data)
                    if (imageSuccess) {
                        if (Location.includes('/blog/')) {
                            const { success, message } = await blogAdd({ image: images[0], ...postForm, content: content })
                            if (success) {
                                setModalText(message)
                                setShow(true)
                            } else {
                                setModalText(message)
                                setShow(true)
                            }
                        } else {
                            const { success, message } = await serviceAdd({ image: images[0], ...postForm, content: content })
                            if (success) {
                                setModalText(message)
                                setShow(true)
                            } else {
                                setModalText(message)
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
                setModalText('Không có hình ảnh nào')
                setShow(true)
            }
        } else {
            setModalText('Tên quá ngắn')
            setShow(true)
        }
    }
    useEffect(() => {
        if (Location.includes('/blog/')) {
            document.title = "Blog"
            setTitleUpload('Blog')
        } else {
            document.title = "Service"
            setTitleUpload('Service')
        }
    }, [Location]);

    if (posts.loadingBlog && posts.loadingService) return <Loading />
    return (
        <Container fluid>
            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>
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
                    <Dropzone validFiles={validFiles} handleValidFiles={(files) => setValidFiles(files)} upload={handleSubmit} btn={false} multiFile={false} />
                </Col>
                <Col md={12}>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control type="text" placeholder="Tên bài viết" name='title' onChange={handlePostForm} defaultValue={postForm.title} />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>Mô tả bài viết</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Mô tả bài viết"
                            style={{ height: '200px' }}
                            name='desc'
                            onChange={handlePostForm}
                            defaultValue={postForm.desc}
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
                        <Form.Check type="checkbox" label="isPublic" name="isPublic" onChange={handleChecked} defaultChecked={postForm.isPublic} />
                    </Form.Group>
                    <Button onClick={handleSubmit}>Upload</Button>
                </Col>
            </Row>

        </Container>
    )
}

export default UploadPost