import React, { useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import { CategoryList } from '../../Constants'
import Banner from '../../assets/images/Banner.png'

function Config() {
    const [contentInput, setContentInput] = useState('Chuyên cung cấp và thi công về thiết bị tưới tự động')
    
    return (
        <Container fluid bg="light">
            <Row className='mt-3'>
                <Col md={12}>
                    <h1>Config</h1>
                </Col>
                <Col md={12}>
                    <div className="w-100">
                        <h5>Category</h5>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={3} className=''>
                    {
                        CategoryList.map((item, index) =>
                            <div key={index} className='w-100'>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Control size="sm" type="text" value={item.title} />
                                </Form.Group>
                                {/* <input type="text" value={item.title} /> */}
                                {item.list.length !== 0 ?
                                    <ul className='mb-2'>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            {
                                                item.list.map((items, index) =>
                                                    <Form.Control size="sm" className='mb-1' key={index} type="text" value={items} />
                                                )
                                            }
                                        </Form.Group>
                                    </ul>
                                    : <></>}
                            </div>
                        )
                    }
                </Col>
                <Col md={9} className=''>
                    <Row className='p-0 w-100 m-0 position-relative' style={{ zIndex: '-100' }}>
                        <Col className='p-0 w-100'>
                            <img className='p-0 w-100' src={Banner} alt="Banner" />
                        </Col>
                        <Col className='Banner__title w-100 h-100 position-absolute d-flex flex-column justify-content-center cursor-d' >
                            <h1>Smart Garden</h1>
                            <span>{contentInput}
                            </span>
                        </Col>
                    </Row>
                    <Form.Group className="my-2" controlId="formBasicEmail">
                        <Form.Label>Nội dung tiêu đề</Form.Label>
                        <Form.Control size="sm" type="text" value={contentInput} onChange={(e) => setContentInput(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
        </Container >
    )
}

export default Config