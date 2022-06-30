import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <Container>
            <div class="d-flex align-items-center justify-content-center vh-80">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-3"> <span class="text-danger">Opps!</span> Không tìm thấy trang.</p>
                    <p class="lead">
                        Trang mà bạn đang tìm kiếm không tồn tại.
                    </p>
                    <Link to='/' class="btn btn-primary">Về trang chủ</Link>
                </div>
            </div>
        </Container>
    )
}

export default Error