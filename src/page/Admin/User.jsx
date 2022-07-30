import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { DayFormat } from '../../Constants.js'

function User() {
    const userData = [
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" },
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" },
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" },
        { username: 'admin', password: '123456789', date: "2022-07-06T23:41:58.000Z" }
    ]
    const addNewUser = () => {
        const addZone = document.getElementById('account')
        const col = document.createElement("div")
        const card = document.createElement("div")
        const cardBody = document.createElement("div")
        const formGroup = document.createElement("div")
        const formGroup2 = document.createElement("div")
        const input = document.createElement("input")
        const input2 = document.createElement("input")
        const label = document.createElement("label")
        const label2 = document.createElement("label")
        const btn = document.createElement("button")
        col.classList.add('col-md-3')
        card.classList.add('card', 'w-100', 'mt-3')
        cardBody.classList.add('card-body')

        input.type = 'text'
        input.placeholder = 'UserName'
        input.classList.add('form-control')

        input2.type = 'password'
        input2.placeholder = 'password'
        input2.classList.add('form-control')

        formGroup.classList.add('form-group', 'mb-3')
        formGroup2.classList.add('form-group', 'mb-3')

        label.innerHTML = 'UserName'
        label2.innerHTML = 'Password'

        btn.type = 'submit'
        btn.classList.add('btn', 'btn-primary')
        btn.innerHTML = 'Tạo'

        formGroup.append(label)
        formGroup.append(input)
        formGroup2.append(label2)
        formGroup2.append(input2)
        cardBody.append(formGroup)
        cardBody.append(formGroup2)
        cardBody.append(btn)
        card.append(cardBody)
        col.append(card)
        addZone.append(col)
    }
    return (
        <Container fluid>
            <Row className='mt-3'>
                <Col md={12} className='d-flex justify-content-between align-items-center' >
                    <h1>Product</h1>
                    <Button onClick={() => addNewUser()}>+</Button>
                </Col>
            </Row>
            <Row id='account' className='mb-5'>
                {
                    userData.map((item, index) =>
                        <Col sm={6} lg={3} key={index}>
                            <Card className='w-100 mt-3' >
                                {/* <Card.Header>Tài khoản</Card.Header> */}
                                <Card.Body >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tài Khoản</Form.Label>
                                        <Form.Control type="text" placeholder="Tài Khoản" value={item.username} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Mật khẩu" value={item.password} />
                                    </Form.Group>
                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                        <span>Ngày tạo:<br /> {DayFormat(item.date)}</span>
                                        <div><button className='btn btn-primary'>chỉnh sửa</button></div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
            </Row>

        </Container>
    )
}

export default User