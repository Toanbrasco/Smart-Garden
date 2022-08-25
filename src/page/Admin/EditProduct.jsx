import React, { useEffect, useContext, useState } from 'react'
import { Col, Container, Form, Row, Modal, Button } from 'react-bootstrap'
import { CategoryList } from '../../Constants.js'
import { useParams } from 'react-router-dom'
import Dropzone from '../../Component/Dropzone/Dropzone'
import Loading from '../../Component/Loading/Loading.jsx'

import { ProductContext } from '../../Contexts/ProductContext.js'
import { ImageContext } from '../../Contexts/ImageContext'

function EditProduct() {
    const { products, getProductDetail, addProduct } = useContext(ProductContext)
    const { image, addImage } = useContext(ImageContext)
    console.log(`=> products`, products)
    const arr = ['Thiết bị tưới', 'Ong']
    const { productname } = useParams()

    const [validFiles, setValidFiles] = useState([]);
    const [imageOld, setImageOld] = useState({})
    const [show, setShow] = useState(false)
    const [modalText, setModalText] = useState('')

    console.log(`=> imageOld`, imageOld)

    const [productForm, setProductForm] = useState({
        name: '',
        desc: '',
        images: [],
        price: {
            base: 0,
            discount: 0
        },
        isPublic: true,
        info: [],
        category: {
            main: CategoryList[0].title,
            detail: CategoryList[0].list[0]
        },
        type: arr[0],
    })
    console.log(`=> productForm`, productForm)

    const addNewRow = () => {
        const addZone = document.getElementById('addZone')
        const div = document.createElement("div")
        const input = document.createElement("input")
        const input2 = document.createElement("input")
        div.classList.add('d-flex', 'flex-sm-row', 'flex-column', 'mt-1')
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
    const handleinfo = () => {
        let info = []
        const name = document.querySelectorAll('#paramaterName')
        const paramater = document.querySelectorAll('#paramater')
        name.forEach((item, index) => {
            info.push({ title: item.value.trim() || '', paramater: paramater[index].value.trim() || '' })
        })
        return info
    }
    const setInfoToProductForm = () => {
        const newInfo = handleinfo()
        setProductForm({ ...productForm, info: newInfo })
    }

    const handleSubmit = async () => {
        if (productForm.name.length > 5) {
            if (validFiles.length !== 0) {
                // setProductForm({ ...productForm, info: newInfo })
                const data = new FormData()
                Array.from(validFiles).forEach(item => {
                    data.append('file', item)
                })
                const { imageSuccess, images, imageMessage } = await addImage(data)
                if (imageSuccess) {
                    const newInfo = handleinfo()
                    // setProductForm({ ...productForm, images: images })
                    // console.log(`=> productForm`, productForm)
                    const { success, message } = await addProduct({ ...productForm, images: images, info: newInfo })
                    if (success) {
                        setModalText(message)
                        setShow(true)
                    } else {
                        setModalText(message)
                        setShow(true)
                    }
                } else {
                    setModalText(imageMessage)
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
        document.title = "Edit Product"
        getProductDetail(productname)
        // setImageOld(products.data[0].images)
        setProductForm(products.data[0])
        setImageOld(productForm.images)
    }, [])

    if (products.loading && products.loading2) return <Loading />

    return (
        <Container fluid bg="light">
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
            <Row className='mt-3'>
                <Col md={12} className='' >
                    <h1>Product</h1>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col md={12}>
                    {/* <div
                        style={{ height: '100%', width: '100%', backgroundColor: 'lightgray' }}>
                    </div> */}
                    <Dropzone validFiles={validFiles} handleValidFiles={(files) => setValidFiles(files)}
                        upload={handleSubmit} imgOld={products.data[0].images} updateImgOld={(img) => setImageOld(img)} btn={false} />
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
                        <Form.Control type="number" placeholder="Giá sản phẩm" defaultValue={products.data[0].price.base} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Giảm giá [%]</Form.Label>
                        <Form.Control type="number" placeholder="Discount của sản phẩm" defaultValue={products.data[0].price.discount} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thông số sản phẩm</Form.Label>
                        <div id='addZone'>
                            {
                                products.data[0].info.map((item, index) =>
                                    <div key={index} className="d-flex flex-sm-row flex-column mt-1" id='info-row'>
                                        <Form.Control type="text" placeholder="Title" value={item.title} onChange={setInfoToProductForm} />
                                        <Form.Control type="text" placeholder="Paramater" value={item.paramater} onChange={setInfoToProductForm} />
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