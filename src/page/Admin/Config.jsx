import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { CategoryList, UrlApi } from '../../Constants'
import Banner from '../../assets/images/Banner.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

function Config() {
    const [contentInput, setContentInput] = useState('Chuyên cung cấp và thi công về thiết bị tưới tự động')
    const [logo, setLogo] = useState(`${UrlApi}/image/Logo.png`)
    const [refesh, setRefesh] = useState(0)
    const infoArr = [
        { title: 'Email', info: 'ABC@gmail.com', contact: true },
        { title: 'Phone', info: '0123456789', contact: true },
        { title: 'Zalo', info: '0123456789', contact: false },
        { title: 'Địa chỉ', info: '1 abc, abc, abc, HCM', contact: true },
    ]
    const [CategoryArr, setCategoryArr] = useState([])
    console.log(`=> CategoryArr`, CategoryArr)

    const handleAddCategoryMain = () => {
        setCategoryArr([...CategoryArr, { title: '', list: [] }])
    }
    const handleAddCategoryDetail = (indexMain) => {
        const Arr = CategoryArr
        Arr[indexMain].list.push('')
        setCategoryArr(Arr)
        setRefesh(refesh + 1)
    }
    const RemoveCategoryMain = (index) => {
        const Arr = CategoryArr
        Arr.splice(index, 1)
        setCategoryArr(Arr)
        setRefesh(refesh + 1)
    }
    const RemoveCategoryDetail = (indexMain, indexDetail) => {
        const Arr = CategoryArr
        Arr[indexMain].list.splice(indexDetail, 1)
        setCategoryArr(Arr)
        setRefesh(refesh + 1)
    }
    const handleCategoryMain = (e, indexMain) => {
        let Arr = CategoryArr
        CategoryArr[indexMain] = { ...CategoryArr[indexMain], title: e.target.value }
        setCategoryArr(Arr)
    }
    const handleCategoryDetail = (e, indexMain, indexDetail) => {
        let Arr = CategoryArr
        Arr[indexMain].list[indexDetail] = e.target.value
        setCategoryArr(Arr)
    }


    useEffect(() => {
        document.title = 'Config'
        setCategoryArr(CategoryList)
    }, [])
    return (
        <Container fluid bg="light">
            <Row className='mt-3'>
                <Col lg={12}>
                    <h1>Config</h1>
                </Col>
            </Row>
            <Row className='d-flex flex-wrap mb-5'>
                <Col lg={3} className=''>
                    <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                        <h5>Category</h5>
                        <Button size='sm' variant='primary'>Upadate Category</Button>
                    </div>
                    {
                        CategoryArr.map((item, indexMain) =>
                            <div key={item.title} className='w-100'>
                                <Form.Group className="mb-2 d-flex" >
                                    <Form.Control size="sm" type="text" defaultValue={item.title} onChange={(e) => handleCategoryMain(e, indexMain)} />
                                    <Button size='sm' variant='primary' onClick={() => handleAddCategoryDetail(indexMain)} ><FontAwesomeIcon icon={faPlus} /></Button>
                                    <Button size='sm' variant='danger' onClick={() => RemoveCategoryMain(indexMain)}><FontAwesomeIcon icon={faTrash} /></Button>
                                </Form.Group>
                                {/* <input type="text" value={item.title} /> */}
                                {item.list.length !== 0 ?
                                    <ul className='mb-2'>
                                        <Form.Group className="mb-2">
                                            {
                                                item.list.map((items, indexDetail) =>
                                                    <div className="d-flex mb-1" key={items}>
                                                        <Form.Control size="sm" className='' type="text" defaultValue={items} onChange={(e) => handleCategoryDetail(e, indexMain, indexDetail)} />
                                                        <Button size='sm' variant='warning' onClick={() => RemoveCategoryDetail(indexMain, indexDetail)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                    </div>
                                                )
                                            }
                                        </Form.Group>
                                    </ul>
                                    : <></>}
                            </div>
                        )
                    }
                    <Button variant='success' className="w-100" onClick={handleAddCategoryMain}>Add New Category</Button>
                </Col>
                <Col lg={9} className=''>
                    <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                        <h5>Logo</h5>
                        <Button size='sm' variant='primary'>Upadate Logo</Button>
                    </div>
                    <div className='w-100 d-flex mb-3'>
                        <img src={logo} alt="Logo" style={{ width: '100px' }} className="border rounded" />
                        <div className="w-100 d-flex justify-content-between align-items-center">
                            <Form.Group className="w-100 ml-3">
                                <Form.Label>Dường dẫn logo</Form.Label>
                                <Form.Control className='' size="sm" type="text" value={logo} />
                            </Form.Group>

                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                        <h5>Banner</h5>
                        <Button size='sm' variant='primary'>Upadate Banner</Button>
                    </div>
                    <div>
                        <div className='p-0 w-100 m-0 position-relative' style={{ zIndex: '-100' }}>
                            <div className='p-0 w-100'>
                                <img className='p-0 w-100' src={Banner} alt="Banner" />
                            </div>
                            <div className='Banner__title w-100 h-100 position-absolute d-flex flex-column justify-content-center cursor-d' style={{ zIndex: '100' }} >
                                <h1>Smart Garden</h1>
                                <span>{contentInput}</span>
                            </div>
                        </div>
                        <Form.Group className="my-2" controlId="formBasicEmail">
                            <Form.Label>Nội dung tiêu đề</Form.Label>
                            <Form.Control size="sm" type="text" value={contentInput} onChange={(e) => setContentInput(e.target.value)} />
                        </Form.Group>
                    </div>
                    <Row>
                        <Col lg={8}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>Thông tin</h5>
                                <Button size='sm' variant='primary'>Upadate Banner</Button>
                            </div>
                            <div className="d-flex flex-column mt-0">
                                {/* <h5><strong>Thông tin</strong></h5> */}
                                {infoArr.map((item, index) =>
                                    <div key={index} className="d-flex  mt-1" id='info-row'>
                                        <Form.Control type="text" placeholder="Tên thông tin" id='paramaterName' defaultValue={item.title} />
                                        <Form.Control type="text" placeholder="Nội dung" id='paramater' defaultValue={item.info} />
                                        <Button variant='danger' ><FontAwesomeIcon icon={faTrash} /></Button>
                                    </div>
                                )}

                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>FaceBook</h5>
                                <Button size='sm' variant='primary'>Upadate FaceBook</Button>
                            </div>
                            <div className="d-flex flex-column mt-0">
                                <div className='FaceBook bg-primary w-100 d-flex justify-content-center align-items-center text-white'>
                                    FaceBook
                                </div>
                                <Form.Group className="my-2">
                                    <Form.Control size="sm" type="text" value={contentInput} onChange={(e) => setContentInput(e.target.value)} />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>Contact</h5>
                                <Button size='sm' variant='primary'>Upadate Contact</Button>
                            </div>
                            <Form.Group className="mb-3 d-flex" >
                                {/* <Form.Label>Public</Form.Label> */}
                                {infoArr.map((item, index) =>

                                    <Form.Check
                                        className='mr-3'
                                        type='checkbox'
                                        id={`default-checkbox`}
                                        label={item.title}
                                        name=''
                                        defaultChecked={item.contact}
                                    />
                                )
                                }
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>Map</h5>
                                <Button size='sm' variant='primary'>Upadate Map</Button>
                            </div>
                            <Form.Group className="my-2">
                                <Form.Control size="sm" type="text" value={''} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    )
}

export default Config