import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'

import { ImageContext } from '../../Contexts/ImageContext'
import { UrlApi, DayFormat } from '../../Constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Images() {
    const { image, getImage, deleteImageID } = useContext(ImageContext)
    console.log(`=> image`, image)
    const [show, setShow] = useState(false)
    const [modalText, setModalText] = useState('')

    const RemoveImageId = async (id) => {
        const { imageMessage } = await deleteImageID(id)
        setModalText(imageMessage)
        setShow(true)
    }
    const handleCloseModal = () => {
        setShow(false)
        getImage()
    }

    useEffect(() => {
        getImage()
    }, [])
    return (
        <Container fluid className='mb-5'>
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
            <Row>
                {image.data.map((item, index) =>
                    <Col key={index} sm={6} lg={3} className='mt-3'>
                        {/* <Link to='blog-detail'> */}
                        <Card style={{ width: '100%' }} className='h-100 d-flex flex-column align-self-stretch flex-grow-1'>
                            <Card.Img variant="top" src={UrlApi + `/image/${item.name}`} />
                            <div className='mt-auto'>
                                {/* <Card.Body >
                                <Card.Title style={{ fontSize: '15px' }} className='text-truncate'>{item.title}</Card.Title>
                                <Card.Text className="text-truncate text-truncate--3 text-justify" >{item.desc}</Card.Text>
                            </Card.Body> */}
                                <Card.Footer className='mt-auto'>
                                    <div className="w-100 d-flex justify-content-between align-items-center mt-auto">
                                        <span>Ngày tạo:<br /> {DayFormat(item.createdAt)}</span>
                                        <div>
                                            {/* <Button as={Link} to={`blog/${convertViToEn(item._id)}`} variant="primary" className=''><FontAwesomeIcon icon={faPenToSquare} /></Button> */}
                                            <Button variant="danger" className='ml-2' onClick={() => RemoveImageId(item._id)}><FontAwesomeIcon icon={faTrash} /></Button>
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