import React from 'react'
import { Container, Row, Col, Table, Form } from 'react-bootstrap'
import Data from '../../assets/Data/test.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function AdProduct() {
    const products = Data
    return (
        <Container fluid bg="light">
            <Row className='mt-3'>
                <Col md={12} className='d-flex justify-content-between align-items-center' >
                    <h1>Product</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search..." />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Discount</th>
                                <th>Category</th>
                                <th>Category</th>
                                <th>type</th>
                                <th>Public</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price.base}</td>
                                        <td>{item.price.discount}</td>
                                        <td>{item.category.main} </td>
                                        <td>{item.category.detail}</td>
                                        <td>{item.type}</td>
                                        <td>{item.isPublic ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}</td>
                                        <td><FontAwesomeIcon icon={faPenToSquare} /></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default AdProduct