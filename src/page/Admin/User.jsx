import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Modal } from 'react-bootstrap'
import Loading from '../../Component/Loading/Loading.jsx'
import { DayFormat } from '../../Constants.js'
import { UserContext } from '../../Contexts/UserContext.js'

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function User() {
    const { user, getUser, registerUser, removeUser } = useContext(UserContext)
    console.log(`=> user`, user)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const [modalText, setModalText] = useState('')
    const userData = [
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" },
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" },
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" },
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" }
    ]
    const [userForm, setUserForm] = useState({
        name: '',
        username: '',
        password: ''
    })
    const handleUserForm = event =>
        setUserForm({ ...userForm, [event.target.name]: event.target.value })

    const handleSubmit = () => {
        if (userForm.username.length < 4 || userForm.password.length < 4) {
            setModalText('Tài khoản và mật khẩu phải dài hơn 4 ký tự')
            setShow(true)
        } else {
            if (userForm.name.length !== 0) {
                setShowForm(false)
                registerUser(userForm)
                setShow2(true)
                setUserForm({ name: '', username: '', password: '' })
            } else {
                setModalText('Bạn chưa nhập tên')
                setShow(true)
            }
        }
    }
    const handleModal = () => {
        setShow2(false)
        getUser()
    }

    const handleCancle = () => {
        setShowForm(false)
        setUserForm({ name: '', username: '', password: '' })
    }

    const [nameUserRemove, setNameUserRemove] = useState()
    const [idRemove, setIdRemove] = useState()
    const handleRemoveUser = (_id, Action) => {
        switch (Action) {
            case "SUBMIT_REMOVE":
                setShow3(false)
                removeUser(_id)
                setShow2(true)
                break;

            case "SHOW_MODAL":
                setIdRemove(_id)
                setNameUserRemove(getNameUser(_id)[0].name)
                setShow3(true)
                break;

            default:
                break;
        }
    }
    const getNameUser = (_id) => {
        return user.data.filter((item) => item._id === _id)
    }

    useEffect(() => {
        getUser()
    }, [])

    if (user.authLoading) {
        return <Loading />
    }

    return (
        <Container fluid>
            <Row className='mt-3'>
                <Col md={12} className='d-flex justify-content-between align-items-center' >
                    <h1>Product</h1>
                    <Button onClick={() => setShowForm(true)}>+</Button>
                </Col>
            </Row>
            <Row id='account' className='mb-5'>

                {
                    user.data.map((item, index) =>
                        <Col key={index} sm={6} lg={3}>
                            <Card className='w-100 mt-3' >
                                <Card.Body >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tên tài khoản</Form.Label>
                                        <Form.Control type="text" placeholder="Tài Khoản" defaultValue={item.name} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tài Khoản</Form.Label>
                                        <Form.Control type="text" placeholder="Tài Khoản" defaultValue={item.username} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Mật khẩu" defaultValue={item.password} />
                                    </Form.Group>
                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                        <span>Ngày tạo:<br /> {DayFormat(item.createdAt)}</span>
                                        <div>
                                            <Button variant="primary" className=''><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                            <Button variant="danger" className='ml-2' onClick={() => handleRemoveUser(item._id, 'SHOW_MODAL')}><FontAwesomeIcon icon={faTrash} /></Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
                {
                    showForm ? <Col sm={6} lg={3}>
                        <Card className='w-100 mt-3' >
                            <Card.Body >
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tên tài Khoản</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Tên tài Khoản" defaultValue={userForm.name} onChange={(e) => handleUserForm(e)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tài Khoản</Form.Label>
                                        <Form.Control type="text" name="username" placeholder="Tài Khoản" defaultValue={userForm.username} onChange={(e) => handleUserForm(e)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Mật khẩu" defaultValue={userForm.password} onChange={(e) => handleUserForm(e)} />
                                    </Form.Group>
                                    <div className="w-100 ">
                                        <Button variant="primary" onClick={() => handleSubmit()}>Tạo</Button>
                                        <Button variant="danger" className='ml-3' onClick={() => handleCancle()}>Huỷ</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col> : <></>
                }
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
                <Modal show={show2} onHide={() => setShow2(false)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Smart Garden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{!user.message ?
                        <div className="spinner-border" role="status" style={{ width: '50px', height: '50px' }}>
                            <span className="sr-only">Loading...</span>
                        </div> : user.message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleModal()}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show3} onHide={() => setShow3(false)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Smart Garden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn muốn xoá tài khoản {nameUserRemove}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleRemoveUser(idRemove, "SUBMIT_REMOVE")}>
                            Xoá
                        </Button>
                        <Button variant="danger" onClick={() => setShow3(false)}>
                            Huỷ
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    )
}

export default User