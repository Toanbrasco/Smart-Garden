import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col, Card, Button, Modal, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap'

import { ImageContext } from '../../Contexts/ImageContext'
import { UrlApi, DayFormat } from '../../Constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopy } from '@fortawesome/free-solid-svg-icons'

import Dropzone from '../../Component/Dropzone/Dropzone'

function Images() {
    const { image, getImage, deleteImageID, addImage } = useContext(ImageContext)
    console.log(`=> image`, image)
    const [show, setShow] = useState(false)
    const [showToast, setShowToast] = useState(false);
    const [modalText, setModalText] = useState('')
    const [validFiles, setValidFiles] = useState([])

    const RemoveImageId = async (id) => {
        const { imageMessage } = await deleteImageID(id)
        setModalText(imageMessage)
        setShow(true)
    }
    const handleSubmit = async () => {
        const data = new FormData()
        Array.from(validFiles).forEach(item => {
            data.append('file', item)
        })
        const { imageMessage } = await addImage(data)
        setModalText(imageMessage)
        setShow(true)
    }
    const handleCloseModal = () => {
        setShow(false)
        getImage()
    }
    const handleCopy = (image) => {
        navigator.clipboard.writeText(`${UrlApi}/image/${image}`)
        setShowToast(true)
    }
    const toggleShowB = () => setShowToast(!showToast);

    useEffect(() => {
        getImage()
    }, [])
    return (
        <Container fluid className='mb-5' >
            <Modal show={show} onHide={() => setShow(false)} animation={false} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Smart Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseModal()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="w-100 d-flex justify-content-center" style={{
                position: 'fixed',
                top: 50,
                right: 0,
                zIndex: 10
            }}>
                <Toast onClose={toggleShowB} show={showToast} animation={false} closeButton={true} delay={1500} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">SmartGarden</strong>
                    </Toast.Header>
                    <Toast.Body className="bg-white">Đã copy đường dẫn</Toast.Body>
                </Toast>
            </div>
            <Row className='mt-3'>
                <Col md={12} className='' >
                    <h1>Image</h1>
                </Col>
            </Row>
            <Row>
                <Col md={12} >
                    <Dropzone validFiles={validFiles} handleValidFiles={(files) => setValidFiles(files)} upload={handleSubmit} btn={true} />
                </Col>
                <Col md={12} className='mt-3'>
                    <h5>Tất cả hình ảnh</h5>
                </Col>
                {image.data.map((item, index) =>
                    <Col key={index} xs={6} md={4} lg={3} className='mt-3'>
                        {/* <Link to='blog-detail'> */}
                        <Card style={{ width: '100%' }} className='h-100 d-flex flex-column align-self-stretch flex-grow-1'>
                            <Card.Img variant="top" src={UrlApi + `/image/${item.name}`} />
                            <div className='mt-auto'>
                                <Card.Footer className='mt-auto p-1 p-sm-3'>
                                    <div className="w-100 d-flex flex-xl-row flex-column justify-content-between align-items-center mt-auto">
                                        <div className='w-100'>
                                            <span>Ngày tạo:<br /> {DayFormat(item.createdAt)}</span>
                                        </div>
                                        <div className='w-100 d-flex justify-content-end'>
                                            <OverlayTrigger
                                                key='top'
                                                placement='top'
                                                overlay={
                                                    <Tooltip id={`tooltip-'top'`}>
                                                        Copy đường dẫn hình ảnh
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="primary" className='' onClick={() => handleCopy(item.name)}><FontAwesomeIcon icon={faCopy} /></Button>
                                            </OverlayTrigger>
                                            <Button variant="danger" className='ml-2 ml-sm-2 mt-sm-0' onClick={() => RemoveImageId(item._id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </div>
                                    </div>
                                </Card.Footer>
                            </div>
                        </Card>
                        {/* </Link> */}
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default Images