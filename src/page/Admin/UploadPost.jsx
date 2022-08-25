import React, { useState, useContext, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom';

import JoditEditor from 'jodit-react';

import { PostContext } from '../../Contexts/PostContext'
import Loading from '../../Component/Loading/Loading';

function UploadPost() {
    const { posts, getBlogDetail, getServiceDetail } = useContext(PostContext)
    console.log(`=> posts1`, posts)
    console.log(`=> posts2`, posts.dataBlog)
    const Location = useLocation().pathname

    const [content, setContent] = useState('')
    const [titleUpload, setTitleUpload] = useState('')

    const editor = useRef(null);
    const config = {
        readonly: false,
        height: 'auto',
        placeholder: 'Nội dung...'
    }
    console.log(Location.includes('/blog/'))
    useEffect(() => {
        if (Location.includes('/blog/')) {
            document.title = "Blog"
            setTitleUpload('Blog')
        } else {
            document.title = "Service"
            setTitleUpload('Service')
        }
    }, []);

    if (posts.loadingBlog && posts.loadingService) return <Loading />
    return (
        <Container fluid>
            <Row className='mb-5'>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3' >
                    <h3>{titleUpload} Update</h3>
                </Col>
                <Col md={12}>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>Tên bài viết</Form.Label>
                        <Form.Control type="text" placeholder="Tên bài viết" />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>Mô tả bài viết</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Mô tả bài viết"
                            style={{ height: '200px' }}
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
                        <Form.Check type="checkbox" label="isPublic" />
                    </Form.Group>
                    <Button>Upload</Button>
                </Col>
            </Row>

        </Container>
    )
}

export default UploadPost