import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Loading() {
    const LoadingStyle = {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: '0px',
        left: '0px',
        zIndex: '10',

    }
    const [switchComponet, setSwitchComponet] = useState(false)
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSwitchComponet(true)
        }, 3000)
        return () => {
            clearTimeout(timeOut);
        };
    })
    return (
        <Container fluid>
            <Row>
                {!switchComponet ?

                    <Col md={12} style={LoadingStyle} className='p-0 bg-white'>
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
                            <div className="spinner-border" role="status" style={{ width: '50px', height: '50px' }}>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <h5 className="mb-1 ml-5 text-truncate">Đang tải trang web...</h5>
                        </div>
                        <h1>Alo</h1>
                    </Col>
                    : <Col md={12} style={LoadingStyle} className='p-0 bg-light'>
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center p-3">
                            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center  rounded text-center" style={{ width: '100%', height: '250px' }}>
                                <h5 className="mb-1 text-truncate">Trang Web đang bị lỗi</h5>
                                <p style={{ fontSize: '18px' }}>Vui lòng quay lại vào thời gian khác hoặc <Link to='/' style={{ fontSize: '18px' }} className='cursor-p text-primary'>trở về trang chủ</Link></p>
                            </div>
                        </div>
                    </Col>
                }
            </Row>
        </Container>
    )
}

export default Loading