import React, { useState, useContext, useEffect } from 'react'
import { Col, Container, Form, Row, Button, Modal } from 'react-bootstrap'

import Dropzone from '../../Component/Dropzone/Dropzone'
import { CategoryList, makeNumArr } from '../../Constants.js'

import { ProductContext } from '../../Contexts/ProductContext.js'
import { ImageContext } from '../../Contexts/ImageContext'
import { ConfigContext } from '../../Contexts/ConfigContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../Component/Loading/Loading'

function UploadProdcut() {
    const { products, addProduct } = useContext(ProductContext)
    const { image, addImage } = useContext(ImageContext)
    const { config, getConfig } = useContext(ConfigContext)
    console.log(`=> config`, config)
    const arr = ['Thiết bị tưới', 'Ong']

    const [show, setShow] = useState(false)
    const [modalText, setModalText] = useState('')
    const [validFiles, setValidFiles] = useState([])
    const [element, setElement] = useState([1])
    const [elementCount, setElementCount] = useState(2)

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
            main: '',
            // config.data.category[0].title,
            detail: ''
            //  config.data.category[0].list[0]
        },
        type: arr[0],
    })
    console.log(`=> productForm`, productForm)

    const addNewRow = () => {
        setElementCount(elementCount + 1)
        const arr = makeNumArr(elementCount)
        setElement(arr)
    }
    const RemoveRowInfo2 = (index) => {
        const info = element
        info.splice(index, 1)
        setElementCount(info.length + 1)
        setElement(info)
    }

    const handleinfo = () => {
        let info = []
        const name = document.querySelectorAll('#paramaterName')
        const paramater = document.querySelectorAll('#paramater')
        name.forEach((item, index) => {
            if (item.value.trim() !== '' || paramater[index].value.trim() !== '') {
                info.push({ title: item.value.trim(), paramater: paramater[index].value.trim() })
            }
        })
        console.log(`=> info`, info)
        return info
    }
    const checkCategory = () => {
        let num = 0
        config.data.category.forEach((item, index) => {
            if (item.title === productForm.category.main) {
                num = index
            }
        })
        console.log(`=> num`, num)
        return num
    }
    const handleProductForm = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value.trim() })
    }
    const handleCategory = (e) => {
        setProductForm({ ...productForm, category: { ...productForm.category, [e.target.name]: e.target.value.trim() } })
    }
    const handlePrice = (e) => {
        setProductForm({ ...productForm, price: { ...productForm.price, [e.target.name]: parseInt(e.target.value) } })
    }
    const handleChecked = e => setProductForm({ ...productForm, [e.target.name]: e.target.checked })


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
        getConfig()
        setProductForm({ ...productForm, category: { ...productForm.category, main: config.data.category[0].title, detail: config.data.category[0].list[0] } })
    }, [])

    if (config.loading) {
        return <Loading />
    }
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
                <Col md={12} >
                    <Dropzone validFiles={validFiles} handleValidFiles={(files) => setValidFiles(files)} upload={handleSubmit} btn={false} />
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Tên sản phẩm" name="name" defaultValue={productForm.name} onChange={handleProductForm} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Mô tả sản phẩm</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Mô tả sản phẩm"
                            style={{ height: '100px' }}
                            name="desc"
                            defaultValue={productForm.desc}
                            onChange={handleProductForm}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Giá sản phẩm</Form.Label>
                        <Form.Control type="number" placeholder="Giá sản phẩm" name="base" defaultValue={productForm.price.base} onChange={handlePrice} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Giảm giá [%]</Form.Label>
                        <Form.Control type="number" placeholder="Giảm giá của sản phẩm" name="discount" defaultValue={productForm.price.discount} onChange={handlePrice} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Thông số sản phẩm</Form.Label>
                        <div id='addZone'>
                            {
                                element.map((item, index) =>
                                    <div key={index} className="d-flex flex-sm-row flex-column mt-1" id='info-row'>
                                        <Form.Control type="text" placeholder="Tên thông số" id='paramaterName' />
                                        <Form.Control type="text" placeholder="Thông số" id='paramater' />
                                        <Button variant='danger' onClick={() => RemoveRowInfo2(index)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </div>
                                )
                            }
                        </div>
                        <Button variant='primary' className=" mt-3" onClick={() => addNewRow()}>Add</Button>
                    </Form.Group>
                    <div className=" mb-3 d-flex flex-sm-row flex-column">
                        <Form.Group>
                            <Form.Label>Loại sản phẩm</Form.Label>
                            <Form.Control as="select" name="type" defaultValue={productForm.type} onChange={handleProductForm}>
                                {
                                    arr.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )
                                }

                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='ml-2'>
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Control as="select" name="main" defaultValue={productForm.category.main} onChange={handleCategory}>
                                {
                                    config.data.category.map((item, index) =>
                                        <option key={index} value={item.title}>{item.title}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                        {config.data.category[checkCategory()].list.length === 0 ? <></> :
                            <Form.Group className='ml-2'>
                                <Form.Label>Danh mục con</Form.Label>
                                <Form.Control as="select" name="detail" className='text-dark' defaultValue={productForm.category.detail} onChange={handleCategory}>
                                    {
                                        config.data.category[checkCategory()].list.map((item, index) =>
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                        }
                        {/* <Form.Control type="text" placeholder="Chi tiết" className='ml-2' name="detail" defaultValue={productForm.category.detail} onChange={handleCategory} /> */}
                    </div>
                    <Form.Group className="mb-3" >
                        {/* <Form.Label>Public</Form.Label> */}
                        <Form.Check
                            type='checkbox'
                            id={`default-checkbox`}
                            label={`Public`}
                            name="isPublic"
                            defaultChecked={productForm.isPublic}
                            onChange={handleChecked}
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </Container >
    )
}

export default UploadProdcut