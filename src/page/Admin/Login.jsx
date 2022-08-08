import React, { useContext, useEffect } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';

function Login() {
    const { loginUser } = useContext(UserContext)
    
    useEffect(() => {
        document.title = "Login"
    }, []);
    return (
        <Container fluid>
            <Row>
                <Col md={12} className='w-100 vh-100 d-flex justify-content-center align-items-center'>
                    <Form.Group className="w-20 mb-3 rounded shadow p-3" controlId="formBasicEmail">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Tên sản phẩm" />
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Tên sản phẩm" />
                        <Button as={Link} to='/admin' onClick={() => loginUser()} className='mt-3 float-right'>Login</Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>

    )
}

export default Login