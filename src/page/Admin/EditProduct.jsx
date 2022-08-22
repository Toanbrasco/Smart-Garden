import React, { useEffect, useContext } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { CategoryList } from '../../Constants.js'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../Contexts/ProductContext.js'


function EditProduct() {
    const { products, getProductDetail } = useContext(ProductContext)
    const arr = ['Thiết bị tưới', 'Ong']
    const { productname } = useParams()
    const addNewRow = () => {
        const addZone = document.getElementById('addZone')
        const div = document.createElement("div")
        const input = document.createElement("input")
        const input2 = document.createElement("input")
        div.classList.add('d-flex', 'flex-sm-row', 'flex-column', 'mt-3')
        input.type = 'text'
        input.placeholder = 'Title'
        input.classList.add('form-control')
        input2.type = 'text'
        input2.placeholder = 'Paramater'
        input2.classList.add('form-control')
        div.append(input)
        div.append(input2)
        // console.log(`=> rows`, rows)
        addZone.append(div)
    }
    useEffect(() => {
        document.title = "Edit Product"
        getProductDetail(productname)
    })
    return (
        <Container fluid bg="light">
            <Row className='mt-3'>
                <Col md={12} className='' >
                    <h1>Product</h1>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col md={12} style={{ height: '300px' }}>
                    <div
                        style={{ height: '100%', width: '100%', backgroundColor: 'lightgray' }}></div>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Tên sản phẩm" value={products.data[0].name} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Mô tả sản phẩm</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Mô tả sản phẩm"
                            style={{ height: '100px' }}
                            value={products.data[0].desc}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Giá sản phẩm</Form.Label>
                        <Form.Control type="number" placeholder="Giá sản phẩm" value={products.data[0].price.base} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Giảm giá [%]</Form.Label>
                        <Form.Control type="number" placeholder="Discount của sản phẩm" value={products.data[0].price.discount} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thông số sản phẩm</Form.Label>
                        <div id='addZone'>
                            {
                                products.data[0].info.map((item, index) =>
                                    <div key={index} className="d-flex flex-sm-row flex-column mt-1" id='info-row'>
                                        <Form.Control type="text" placeholder="Title" value={item.title} />
                                        <Form.Control type="text" placeholder="Paramater" value={item.paramater} />
                                    </div>
                                )
                            }
                        </div>
                        <button className="btn btn-primary mt-3" onClick={() => addNewRow()}>Add</button>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category</Form.Label>
                        <div className="d-flex flex-sm-row flex-column">
                            <Form.Group controlId="ControlSelect1">
                                <Form.Control as="select" aria-label="Default select example">
                                    {
                                        arr.map((item, index) =>
                                            <option key={index} value={index}>{item}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="ControlSelect2" className='ml-2'>
                                <Form.Control as="select" aria-label="Default select example" value={products.data[0].category.main} >
                                    {
                                        CategoryList.map((item, index) =>
                                            <option key={index} value={index}>{item.title}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Control type="text" placeholder="Chi tiết" className='ml-2' value={products.data[0].category.detail} />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Check
                            type='checkbox'
                            id={`default-checkbox`}
                            label={`Public`}
                            value={products.data[0].isPublic}
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <button className='btn btn-primary'>Submit</button>
                </Col>
            </Row>
        </Container >
    )
}

export default EditProduct