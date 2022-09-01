import React, { useEffect, useState, useRef, useContext } from 'react'
import { Col, Container, Row, Form, Button, Modal } from 'react-bootstrap'
import { CategoryList, UrlApi, makeNumArr } from '../../Constants'
import Banner from '../../assets/images/Banner.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../Component/Loading/Loading'
import axios from 'axios'

import { ConfigContext } from '../../Contexts/ConfigContext'

function Config() {
    const { config, configDispart, refeshConfig, updateConfig } = useContext(ConfigContext)
    console.log(`=> config`, config)
    const ref = useRef(null)
    const [width, setWidth] = useState(500)

    const [contentInput, setContentInput] = useState('')
    const [logo, setLogo] = useState('')
    const [fbHref, setFbHref] = useState('')
    const [element, setElement] = useState([])
    const [elementCount, setElementCount] = useState(1)
    const [refesh, setRefesh] = useState(0)
    const [infoArr, setInfoArr] = useState([])
    const [CategoryArr, setCategoryArr] = useState([])
    const [map, setMap] = useState('')
    const [modalText, setModalText] = useState('')
    const [show, setShow] = useState(false)

    // Info------------------------------------------
    // Add
    const addNewRow = () => {
        setElementCount(elementCount + 1)
        const arr = makeNumArr(elementCount)
        setElement(arr)
    }
    // remove
    const RemoveRowInfo = (index) => {
        const info = infoArr
        info.splice(index, 1)
        setInfoArr(info)
        setRefesh(refesh + 1)
    }
    const RemoveRowInfo2 = (index) => {
        const info = element
        info.splice(index, 1)
        setElementCount(info.length + 1)
        setElement(info)
    }
    // get info 
    const handleinfo = () => {
        let info = []
        const infoTitle = document.querySelectorAll('#infoTitle')
        const paramater = document.querySelectorAll('#info')
        infoTitle.forEach((item, index) => {
            if (item.value.trim() !== '' || paramater[index].value.trim() !== '') {
                if (infoArr[index] === undefined) {
                    info.push({ title: item.value.trim(), info: paramater[index].value.trim(), contact: false })
                } else {
                    info.push({ title: item.value.trim(), info: paramater[index].value.trim(), contact: infoArr[index].contact })
                }
            }
        })
        return info
    }

    // Contact
    // const [numChecked, setNumChecked] = useState(0)
    // console.log(`=> numChecked`, numChecked)
    // const checkedCount = () => {

    //     console.log(`=> count`, count)
    //     setNumChecked(count)
    // }
    const handleContact = (e, index) => {
        let count = 0
        infoArr.forEach((item, index) => {
            if (item.contact === true) {
                count += 1
            }
        })
        console.log(`=> count`, count)
        console.log(`=> e.target.checked `, e.target.checked)
        if (e.target.checked === true) {
            if (count >= 3) {
                console.log('>=3')
                setModalText('Chỉ hiển thỉ được 3 thông tin ở Contact')
                setShow(true)
                const Arr = infoArr
                infoArr[index].contact = false
                setInfoArr(Arr)
                setRefesh(refesh + 1)
            } else {
                const Arr = infoArr
                infoArr[index].contact = true
                setInfoArr(Arr)

            }
        } else {
            const Arr = infoArr
            infoArr[index].contact = e.target.checked
            setInfoArr(Arr)
        }
    }
    // Category------------------------------------
    // Add
    const handleAddCategoryMain = () => {
        setCategoryArr([...CategoryArr, { title: '', list: [] }])
    }
    const handleAddCategoryDetail = (indexMain) => {
        const Arr = CategoryArr
        Arr[indexMain].list.push('')
        setCategoryArr(Arr)
        setRefesh(refesh + 1)
    }
    // set value 
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
    // remove
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

    // update 
    const handleUpdateconfig = async (type) => {
        let data
        switch (type) {
            case 'INFO':
                data = handleinfo()
                break;

            case 'FB':
                data = fbHref
                break;

            case 'CATEGORY':
                data = CategoryArr
                break;

            case 'LOGO':
                data = logo.substr(logo.lastIndexOf("/") + 1)
                break;

            case 'CONTACT':
                data = handleinfo()
                break;

            case 'MAP':
                data = map
                break;

            case 'TITLE':
                data = contentInput
                break;

            default:
                break;
        }
        const { message } = await updateConfig(config.data._id, type, data)
        setModalText(message)
        setShow(true)

    }
    // Close Modal
    const handleCloseModal = () => {
        setShow(false)
        refeshConfig()
        getConfig()
    }
    // -------------------------------------------------------------------
    const getConfig = async () => {
        const CONFIG_GET = 'CONFIG_GET'
        const CONFIG_FAIL = 'CONFIG_FAIL'
        try {
            const response = await axios.get(`${UrlApi}/api/config`)
            const data = response.data.data[0]
            if (response.data.success) {
                setCategoryArr(data.category)
                setInfoArr(data.info)
                setFbHref(data.facebook)
                setLogo(`${UrlApi}/image/${data.logo}`)
                setContentInput(data.title)
                setMap(data.map)
                configDispart({ type: CONFIG_GET, payload: response.data })
            }
        } catch (error) {
            configDispart({ type: CONFIG_FAIL, payload: error })
        }
    }

    // get width ---------------------------------------------
    const handleResize = () => {
        setWidth(ref.current.clientWidth)
        window.FB.XFBML.parse();
    }
    useEffect(() => {
        window.FB.XFBML.parse();
        window.addEventListener('load', handleResize)
        window.addEventListener('resize', handleResize)
        return () => {
            window.addEventListener('load', handleResize)
            window.addEventListener('resize', handleResize)
        }

    }, [ref])

    useEffect(() => {
        document.title = 'Config'
        getConfig()
    }, [])

    if (config.loading) {
        return <Loading />
    }
    return (
        <Container fluid bg="light">
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
            <Row className='mt-3'>
                <Col lg={12}>
                    <h1>Config</h1>
                </Col>
            </Row>
            <Row className='d-flex flex-wrap mb-5'>
                <Col lg={3} className=''>
                    <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                        <h5>Category</h5>
                        <Button size='sm' variant='primary' onClick={() => handleUpdateconfig('CATEGORY')}>Upadate Category</Button>
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
                        <Button size='sm' variant='primary' onClick={() => handleUpdateconfig('LOGO')}> Upadate Logo</Button>
                    </div>
                    <div className='w-100 d-flex mb-3'>
                        <img src={logo} alt="Logo" style={{ width: '100px' }} className="border rounded" />
                        <div className="w-100 d-flex justify-content-between align-items-center">
                            <Form.Group className="w-100 ml-3">
                                <Form.Label>Dường dẫn logo</Form.Label>
                                <Form.Control className='' size="sm" type="text" defaultValue={logo} />
                            </Form.Group>

                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                        <h5>Banner</h5>
                        <Button size='sm' variant='primary' onClick={() => handleUpdateconfig('TITLE')}>Upadate Banner</Button>
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
                            <Form.Control size="sm" type="text" defaultValue={contentInput} onChange={(e) => setContentInput(e.target.value)} />
                        </Form.Group>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>Thông tin</h5>
                                <Button size='sm' variant='primary' onClick={() => handleUpdateconfig('INFO')}>Upadate thông tin</Button>
                            </div>
                            <div className="d-flex flex-column mt-0">
                                {/* <h5><strong>Thông tin</strong></h5> */}
                                {
                                    infoArr.map((item, index) =>
                                        <div key={item.title} className="d-flex  mt-1" id='info-row'>
                                            <Form.Control type="text" placeholder="Tên thông tin" id='infoTitle' defaultValue={item.title} />
                                            <Form.Control type="text" placeholder="Nội dung" id='info' defaultValue={item.info} />
                                            <Button variant='danger' onClick={() => RemoveRowInfo(index)} ><FontAwesomeIcon icon={faTrash} /></Button>
                                        </div>
                                    )
                                }
                                {
                                    element.map((item, index) =>
                                        <div key={index} className="d-flex flex-sm-row flex-column mt-1" id='info-row'>
                                            <Form.Control type="text" placeholder="Tên thông số" id='infoTitle' />
                                            <Form.Control type="text" placeholder="Thông số" id='info' />
                                            <Button variant='danger' onClick={() => RemoveRowInfo2(index)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </div>
                                    )
                                }
                            </div>
                            <Button variant='success' className='w-100 my-2' onClick={addNewRow}>Add New Info</Button>
                        </Col>
                        <Col lg={6} ref={ref}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>FaceBook</h5>
                                <Button size='sm' variant='primary' onClick={() => handleUpdateconfig('FB')}>Upadate FaceBook</Button>
                            </div>
                            <div className="d-flex flex-column mt-0" >
                                <div className="fb-page"
                                    data-href="https://www.facebook.com/smartgarden.om"
                                    data-width={width}
                                    data-hide-cover="false"
                                    data-show-facepile="false">
                                </div>
                                {/* <div className='FaceBook bg-primary w-100 d-flex justify-content-center align-items-center text-white'>
                                    FaceBook
                                </div> */}
                                <Form.Group className="my-2">
                                    <Form.Control size="sm" type="text" defaultValue={fbHref} onChange={(e) => setFbHref(e.target.value)} />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>Contact</h5>
                                <Button size='sm' variant='primary' onClick={() => handleUpdateconfig('CONTACT')}>Upadate Contact</Button>
                            </div>
                            <Form.Group className="mb-3 d-flex" >
                                {
                                    infoArr.map((item, index) =>
                                        <Form.Check
                                            key={item.title}
                                            className='mr-3'
                                            type='checkbox'
                                            id={`default-checkbox`}
                                            label={item.title}
                                            name=''
                                            defaultChecked={item.contact}
                                            onChange={(e) => handleContact(e, index)}
                                        />
                                    )
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div className="w-100 d-flex justify-content-between align-items-center my-3">
                                <h5>Map</h5>
                                <Button size='sm' variant='primary' onClick={() => handleUpdateconfig('MAP')}>Upadate Map</Button>
                            </div>
                            {/* <Form.Group className="my-2">
                                <Form.Control size="sm" type="text" value={''} />
                            </Form.Group> */}
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default Config