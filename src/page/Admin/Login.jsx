import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, Toast } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
// import Logo from '../../assets/images/Logo.png'

function Login() {
    const { loginUser, user } = useContext(UserContext)
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const navigate = useNavigate()

    console.log(`=> user`, user)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const onChangeLoginForm = event =>
        // console.log(`=> event`, event.target)
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const handleSubmit = () => {
        if (loginForm.username.length !== 0 || loginForm.password.length !== 0) {
            loginUser(loginForm)
        }
        if (user.message) {
            setShowA(true)
        }
    }
    if (user.isAuthenticated) {
        navigate('/admin')
    }
    useEffect(() => {
        document.title = "Login"
    }, []);
    const styleToat = {
        top: '50px',

    }
    return (
        <Container fluid>
            <Row>
                <Col md={12} className='w-100 vh-100 d-flex justify-content-center align-items-center position-relative'>
                    <Form.Group className="w-20 sm-w-80 mb-3 rounded shadow p-3" >
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control type="text" placeholder="User Name" name='username' id='username' defaultValue={loginForm.username} onChange={onChangeLoginForm} required />
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' id='password' defaultValue={loginForm.password} onChange={onChangeLoginForm} required />
                        <Button className='mt-3 float-right' onClick={handleSubmit}>Login</Button>
                    </Form.Group>
                    <Toast show={showA} onClose={toggleShowA} className='position-absolute' style={styleToat} closeButton={true} delay={2000} autohide>
                        <Toast.Header>
                            {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
                            <strong className="mr-auto">Smart Garden</strong>
                            {/* <small>just now</small> */}
                        </Toast.Header>
                        <Toast.Body>{user.message}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </Container>

    )
}

export default Login