import React, { useState, useEffect } from 'react'
import { faClipboardList, faComments, faDollarSign, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'


function Dashboard() {
    const Dbarr = [
        { name: 'EARNINGS (MONTHLY)', icon: faDollarSign },
        { name: 'EARNINGS (ANNUAL)', icon: faDollarSign },
        { name: 'EARNINGS (MONTHLY)', icon: faClipboardList },
        { name: 'PENDING REQUESTS', icon: faComments }]

    return (
        <Container fluid bg="light">
            <Row className='mt-3'>
                <Col md={12} >
                    <h1>Dashboard</h1>
                </Col>
            </Row>
            <Row>
                <Col md={3} className='mt-3'>
                    <div className='d-flex align-items-center justify-content-between p-3 shadow rounded border-left-primary'>
                        <div className='d-flex  justify-content-between flex-column'>
                            <h6 className='m-0'>{Dbarr[0].name}</h6>
                            <h4 className='mt-3 mb-0'>123.123.126 VND</h4>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={Dbarr[0].icon} style={{ fontSize: '2rem', opacity: '0.3' }} />
                        </div>
                    </div>
                </Col>
                <Col md={3} className='mt-3'>
                    <div className='d-flex align-items-center justify-content-between p-3 shadow rounded border-left-success'>
                        <div className='d-flex  justify-content-between flex-column'>
                            <h6 className='m-0'>{Dbarr[1].name}</h6>
                            <h4 className='mt-3 mb-0'>123.123.126 VND</h4>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={Dbarr[1].icon} style={{ fontSize: '2rem', opacity: '0.3' }} />
                        </div>
                    </div>
                </Col>
                <Col md={3} className='mt-3'>
                    <div className='d-flex align-items-center justify-content-between p-3 shadow rounded border-left-info'>
                        <div className='d-flex  justify-content-between flex-column'>
                            <h6 className='m-0'>{Dbarr[2].name}</h6>
                            <h4 className='mt-3 mb-0'>123.123.126 VND</h4>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={Dbarr[2].icon} style={{ fontSize: '2rem', opacity: '0.3' }} />
                        </div>
                    </div>
                </Col>
                <Col md={3} className='mt-3'>
                    <div className='d-flex align-items-center justify-content-between p-3 shadow rounded border-left-warning'>
                        <div className='d-flex  justify-content-between flex-column'>
                            <h6 className='m-0'>{Dbarr[3].name}</h6>
                            <h4 className='mt-3 mb-0'>123.123.126 VND</h4>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={Dbarr[3].icon} style={{ fontSize: '2rem', opacity: '0.3' }} />
                        </div>
                    </div>
                </Col>
            </Row>

        </Container >
    )
}

export default Dashboard