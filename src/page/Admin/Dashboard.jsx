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

    const { page } = useParams()
    console.log(`=> page`, page)
    const [pagingActive, setPagingActive] = useState(1)
    const PagingArr = [1, 2, 3, 4, 5, 6, 7, 8]
    const [arrCenter, SetArrCenter] = useState(1)
    const pagiantion = {
        page: 1,
        limit: 12,
        totalPage: 10
    }
    const makeNumArr = num => new Array(num).fill("").map((_, i) => i + 1);
    const countPaging = (num) => {
        switch (num) {
            case 0:
                if (arrCenter !== 0) {
                    SetArrCenter(arrCenter - 1)
                }
                setPagingActive(pagingActive - 1)
                break;
            case 1:
                setPagingActive(pagingActive + 1)
                if (arrCenter !== PagingArr.length) {
                    SetArrCenter(arrCenter + 1)
                }
                break;
            default:
                break;
        }

    }
    useEffect(() => {
        setPagingActive(parseInt(page))
        SetArrCenter(parseInt(page))
    }, [page])
    return (
        <Container fluid bg="light">
            <Row className='mt-3'>
                <Col md={12} >
                    <h1>Dashboard</h1>
                </Col>
            </Row>
            {/* <Row>
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
            </Row> */}
            <Row>
                <Col md={12} className="d-flex justify-content-center mt-3 mb-5">
                    <div className={PagingArr[0] === pagingActive ? "d-none" : "btn-nav hover-sh"} onClick={() => countPaging(0)}><strong><FontAwesomeIcon icon={faAngleLeft} /> </strong></div>
                    <div className={PagingArr[0] + 2 >= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{PagingArr[0]}</span></div>
                    <div className={PagingArr[0] + 2 >= pagingActive ? "d-none" : "btn-nav"}><span>...</span></div>
                    {/* {
                        PagingArr.map((item, index) => item <= (arrCenter + 2) && item >= (arrCenter - 2) &&
                            <div key={index} className={pagingActive === item ? "btn-nav active" : "btn-nav hover-sh"}><span>{item}</span></div>
                        )
                    } */}
                    {
                        makeNumArr(pagiantion.totalPage).map((item, index) => item <= (arrCenter + 2) && item >= (arrCenter - 2) &&
                            <div key={index} className={pagingActive === item ? "btn-nav active" : "btn-nav hover-sh"}><span>{item}</span></div>)
                    }
                    <div className={PagingArr[PagingArr.length - 1] - 2 <= pagingActive ? "d-none" : "btn-nav "}><span>...</span></div>
                    <div className={PagingArr[PagingArr.length - 1] - 2 <= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{PagingArr[PagingArr.length - 1]}</span></div>
                    <div className={PagingArr[PagingArr.length - 1] === pagingActive ? "d-none" : "btn-nav hover-sh"} onClick={() => countPaging(1)}><strong><FontAwesomeIcon icon={faAngleRight} /> </strong></div>
                </Col>
            </Row>
        </Container >
    )
}

export default Dashboard