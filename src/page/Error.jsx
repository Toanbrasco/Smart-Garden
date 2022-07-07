import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Error() {
    useEffect(() => {
        document.title = "Smart Garden"
    }, []);
    return (
        <Container>
            <div className="d-flex align-items-center justify-content-center vh-80">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Không tìm thấy trang.</p>
                    <p className="lead">
                        Trang mà bạn đang tìm kiếm không tồn tại.
                    </p>
                    <Link to='/' className="btn btn-primary">Về trang chủ</Link>
                </div>
            </div>
        </Container>
    )
}

export default Error