import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Banner from '../assets/images/Banner.png'
import Bec from '../assets/images/BEC-TR.png'
import ONG from '../assets/images/ThungOng.png'
import '../style/Home.css'

function Home() {
    return (
        <>
            <Container fluid className='p-0 w-100 position-relative'>
                <Row className='p-0 w-100 m-0' style={{zIndex:'-100'}}>
                    <Col className='p-0 w-100'>
                        <img className='p-0 w-100' src={Banner} alt="Banner" />
                    </Col>
                    <Col className='Banner__title w-100 h-100 position-absolute d-flex flex-column justify-content-center'>
                        <h1>Smart Garden</h1>
                        <span>Chuyên cung cấp và thi công về thiết bị tưới tự động
                        </span>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className='Home__category d-flex justify-content-between mt-5'>
                    <Col md={6} className=''>
                        <div className="Home__category-box position-relative w-100 h-100">
                            <img src={Bec} alt="Bec" className='h-100 position-absolute' />
                            <div className='w-100 h-50 d-flex flex-column align-items-end p-3 rounded shadow-sm position-absolute'>
                                <h5 className='align-items-end'>Tưới tự động</h5>
                                <span>Các sản phẩm về tưới tự động</span>
                            </div>

                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="Home__category-box position-relative d-flex w-100 h-100">
                            <div className='w-100 h-50 d-flex flex-column align-items-start p-3 rounded shadow-sm position-absolute'>
                                <h5>Tưới tự động</h5>
                                <span>Các sản phẩm về tưới tự động</span>
                            </div>
                            <img src={ONG} alt="Ong" className='h-100 position-absolute' />

                        </div>
                    </Col>
                </Row>
                <Row className='outstanding__title mt-5'>
                    <Col md={12} className='d-flex justify-content-between '>
                        <h5 className=''>Sản phẩm nổi bật</h5>
                        <span>Tất cả sản phẩm</span>
                    </Col>
                    {
                        [1, 2, 3, 4].map((item) =>
                            <Col md={6} lg={3} className="outstanding__products mt-3">
                                <Card style={{ width: '100%', border: 'none' }} className='shadow-lg'>
                                    <Card.Img variant="top" className="p-4" src={Bec} />
                                    <Card.Body className='px-3'>
                                        <Card.Title style={{fontSize:'20px'}} className="mb-1"><strong>Béc tưới 1234567890</strong></Card.Title>
                                        <Card.Text className="text-danger"><strong>123.123.123 VND</strong></Card.Text>
                                        {/* <Card.Link href="#" className='float-right text-dark'>Card Link</Card.Link> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
                <Row className='mt-5 h-100'>
                    <Col md={12} className="h-100">
                        <div className='home__service position-relative'>
                            <div className='position-absolute  '>
                                <div className=' p-3 d-block d-flex justify-content-center flex-column h-100 shadow-sm rounded'>
                                    <h5>Dịch vụ</h5>
                                    <span>Thiết kế và thi công các công trình về tưới tự động</span>
                                    <div className='btn-service'><span>Liên hệ ngay để được tư vấn</span></div>

                                </div>
                            </div>
                            <img src={Bec} alt="Bec" className='position-absolute d-none d-md-none d-lg-flex' />
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={12} className='d-flex justify-content-between'>
                        <h5><strong>Blog</strong></h5>
                        <span>All</span>
                    </Col>
                    {[1, 2, 3].map((item) =>
                        <Col md={4} key={item} className='mt-3 '>
                            <Card style={{ width: '100%', border: 'none' }}  >
                                <Card.Img variant="top" src={Bec} className='shadow-sm p-4' />
                                <Card.Body className='px-0'>
                                    <Card.Title><strong>Card Title</strong></Card.Title>
                                    <Card.Text>Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Card.Link href="#" className='float-right text-dark'>Xem chi tiết</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}

                </Row>
            </Container>
        </>
    )
}

export default Home