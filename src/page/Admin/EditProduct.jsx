import React, { useEffect, useContext, useState } from 'react'
import { Col, Container, Form, Row, Modal, Button } from 'react-bootstrap'
import { CategoryList, UrlApi } from '../../Constants.js'
import { useParams } from 'react-router-dom'
import Dropzone from '../../Component/Dropzone/Dropzone'
import Loading from '../../Component/Loading/Loading.jsx'

import { ProductContext } from '../../Contexts/ProductContext.js'
import { ImageContext } from '../../Contexts/ImageContext'
import axios from 'axios'
import { faLessThan } from '@fortawesome/free-solid-svg-icons'

function EditProduct() {
    const { products, getProductDetail, addProduct, updateProduct, refeshProduct, productDispatch } = useContext(ProductContext)
    const { image, addImage, updateImage } = useContext(ImageContext)
    // console.log(`=> products`, products)
    const arr = ['Thiết bị tưới', 'Ong']
    const { id } = useParams()
    const PRODUCT_DETAIL = 'PRODUCT_DETAIL'
    const PRODUCT_LOADED_FAIL = 'PRODUCT_LOADED_FAIL'

    const [validFiles, setValidFiles] = useState([]);
    const [imageOld, setImageOld] = useState({})
    const [show, setShow] = useState(false)
    const [modalText, setModalText] = useState('')

    // console.log(`=> imageOld`, imageOld)

    const [productForm, setProductForm] = useState(
        {
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
                detail: ''
            },
            type: arr[0],
        })
    console.log(`=> productForm after get`, productForm)

    const addNewRow = () => {
        const addZone = document.getElementById('addZone')
        const div = document.createElement("div")
        const input = document.createElement("input")
        const input2 = document.createElement("input")
        div.classList.add('d-flex', 'flex-sm-row', 'flex-column', 'mt-1')
        input.type = 'text'
        input.placeholder = 'Tên thông số'
        input.classList.add('form-control')
        input.id = 'paramaterName'
        input2.type = 'text'
        input2.placeholder = 'Thông số'
        input2.classList.add('form-control')
        input2.id = 'paramater'
        div.append(input)
        div.append(input2)
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
    const handleProductForm = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value.trim() })
    }
    const handleCategory = (e) => {
        setProductForm({ ...productForm, category: { ...productForm.category, [e.target.name]: e.target.value.trim() } })
        // setProductForm({ ...productForm, category: { ...productForm.category, detail: detailCategory() } })
    }
    const handlePrice = (e) => {
        setProductForm({ ...productForm, price: { ...productForm.price, [e.target.name]: parseInt(e.target.value) } })
    }
    const handleChecked = e => setProductForm({ ...productForm, [e.target.name]: e.target.checked })
    const checkCategory = () => {
        let num = 0
        CategoryList.forEach((item, index) => {
            if (item.title === productForm.category.main) {
                num = index
            }
        })
        return num
    }
    const detailCategory = () => {
        let detail = 'BASE'
        CategoryList.forEach((item, index) => {
            if (item.title === productForm.category.main) {
                // if (productForm.category.detail.length === 0) {
                if (!CategoryList[index].list.includes(productForm.category.detail)) {
                    if (item.list.length === 0) {
                        detail = ''
                    }
                    else {
                        detail = CategoryList[index].list[0]
                    }
                }
            }
        })
        console.log(`=> detail`, detail)
        return detail
    }
    // console.log(`=>  detailCategory()`, detailCategory())
    const handleSubmit = async () => {
        if (productForm.name.length > 5) {
            // if (validFiles.length !== 0) {
            // setProductForm({ ...productForm, info: newInfo })
            const data = new FormData()
            Array.from(validFiles).forEach(item => {
                data.append('file', item)
            })
            data.append('Old', products.data[0].images)
            data.append('New', imageOld)
            // console.log('Image Old', products.data[0].images, 'Image New', imageOld)
            const newInfo = handleinfo()
            // console.log(`=> newInfo`, newInfo)
            setProductForm({ ...productForm, info: newInfo })
            // console.log('productForm', productForm)
            const { imageSuccess, images, imageMessage } = await updateImage(data)
            console.log(`=> images`, images)
            console.log(`=> imageSuccess`, imageSuccess)
            if (imageSuccess) {
                const newInfo = handleinfo()
                let productUpdate = {}
                if (detailCategory() === 'BASE') {
                    productUpdate = { ...productForm, images: images, info: newInfo }
                } else {
                    productUpdate = { ...productForm, images: images, info: newInfo, category: { ...productForm.category, detail: detailCategory() } }
                }
                console.log(`=> productUpdate`, productUpdate)
                const { success, message } = await updateProduct(productUpdate)
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
            // } else {
            //     setModalText('Không có hình ảnh nào')
            //     setShow(true)
            // }
        } else {
            setModalText('Tên quá ngắn')
            setShow(true)
        }
    }

    const handleClose = () => {
        setShow(false)
        getDetail(id)
    }
    const getDetail = async (id) => {
        refeshProduct()
        console.log('Get Products Detail', id)
        try {
            const response = await axios.get(`${UrlApi}/api/products/id?id=${id}`)
            console.log(`=> products Detail`, response.data)
            if (response.data.success) {
                setProductForm(response.data.data[0])
                setImageOld(response.data.data[0].images)
                productDispatch({ type: PRODUCT_DETAIL, payload: response.data })
            }
        } catch (error) {
            productDispatch({ type: PRODUCT_LOADED_FAIL, payload: error })
        }
    }

    useEffect(() => {
        document.title = "Edit Product"
        getDetail(id)
    }, [])

    if (products.loadingDetail) return <Loading />

    return (
        <Container fluid bg="light">

            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClose()}>
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
                                productForm.info.map((item, index) =>
                                    <div key={index} className="d-flex flex-sm-row flex-column mt-1" id='info-row'>
                                        <Form.Control type="text" placeholder="Tên thông số" id='paramaterName' defaultValue={item.title} />
                                        <Form.Control type="text" placeholder="Thông số" id='paramater' defaultValue={item.paramater} />
                                    </div>
                                )
                            }
                        </div>
                        <button className="btn btn-primary mt-3" onClick={() => addNewRow()}>Add</button>
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
                                    CategoryList.map((item, index) =>
                                        <option key={index} value={item.title}>{item.title}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                        {
                            CategoryList[checkCategory()].list.length === 0 ? <></> :
                                //  productForm.category.detail === '' ? <></> :
                                <Form.Group className='ml-2'>
                                    <Form.Label>Danh mục con</Form.Label>
                                    <Form.Control as="select" name="detail" className='text-dark' defaultValue={productForm.category.detail} onChange={handleCategory}>
                                        {
                                            CategoryList[checkCategory()].list.map((item, index) =>
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

export default EditProduct