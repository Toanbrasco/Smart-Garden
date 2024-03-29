import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Banner from '../assets/images/Banner.png'
import Bec from '../assets/images/BEC-TR.png'
import ONG from '../assets/images/ThungOng.png'
import '../style/Home.css'
import Loading from '../Component/Loading/Loading'
import { convertViToEn, numberFormat, UrlApi } from '../Constants.js'

import { ProductContext } from '../Contexts/ProductContext'
import { PostContext } from '../Contexts/PostContext'
import { ConfigContext } from '../Contexts/ConfigContext'

function Home() {
    // const products = [...Products]
    const { products, getProductsHome } = useContext(ProductContext)
    const { posts, getBlog } = useContext(PostContext)
    const { config, getConfig } = useContext(ConfigContext)

    useEffect(() => {
        document.title = "Smart Garden"
        getProductsHome()
        getBlog(1, 3)
        getConfig()
    }, []);

    if (products.loading || posts.loadingBlog) {
        return <Loading />
    }
    return (
        <>
            <Container fluid className='p-0 w-100 position-relative'>
                <Row className='p-0 w-100 m-0' style={{ zIndex: '-100' }}>
                    <Col className='p-0 w-100'>
                        <img className='p-0 w-100' src={Banner} alt="Banner" />
                    </Col>
                    <Col className='Banner__title w-100 h-100 position-absolute d-flex flex-column justify-content-center cursor-d' >
                        <h1>Smart Garden</h1>
                        <span>{config.data.title}</span>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className='Home__category d-flex justify-content-between mt-5'>
                    <Col md={6} className=''>
                        <div className="Home__category-box position-relative w-100 h-100 cursor-p">
                            <img src={Bec} alt="Bec" className=' position-absolute category-img' />
                            <div className='w-100 h-50 d-flex flex-column align-items-end p-3 rounded shadow-sm position-absolute'>
                                <h5 className='align-items-end'>Tưới tự động</h5>
                                <span>Các sản phẩm về tưới tự động</span>
                            </div>

                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="Home__category-box  position-relative d-flex w-100 h-100 cursor-p">
                            <div className='w-100 h-50 d-flex flex-column align-items-start p-3 rounded shadow-sm position-absolute'>
                                <h5>Tưới tự động</h5>
                                <span>Các sản phẩm về tưới tự động</span>
                            </div>
                            <img src={ONG} alt="Ong" className=' position-absolute category-img' />

                        </div>
                    </Col>
                </Row>
                <Row className='outstanding__title mt-5' >
                    <Col md={12} className='d-flex justify-content-between '>
                        <h5 className='cursor-d'>Sản phẩm nổi bật</h5>
                        <span className='cursor-p'><Link to='Products'>Tất cả sản phẩm</Link></span>
                    </Col>
                    {
                        products.data.map((item, index) => index < 4 &&
                            <Col xs={6} lg={3} className="outstanding__products mt-3" key={item.name} >
                                <Card style={{ width: '100%', border: 'none' }} className='shadow-lg hover-sh cursor-p' as={Link} to={'/product/' + convertViToEn(item.name)}>
                                    <Card.Img variant="top" className="p-4" src={Bec} />
                                    <Card.Body className='px-3'>
                                        <Card.Title style={{ fontSize: '15px' }} className="mb-1 text-truncate"><strong>{item.name}</strong></Card.Title>
                                        <Card.Text className="text-danger"><strong>{numberFormat(item.price.base)}</strong></Card.Text>
                                        {/* <Card.Link href="#" className='float-right text-dark'>Card Link</Card.Link> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
                <Row className='mt-5 h-100'>
                    <Col as={Link} to="/service" md={12} className="h-100">
                        <div className='home__service position-relative'>
                            <div className='position-absolute'>
                                <div className='p-3 d-block d-flex justify-content-center flex-column h-100 shadow-sm rounded'>
                                    <h5>Dịch vụ</h5>
                                    <span className='mt-2 w-60 w-md-100 text-dark'>Thiết kế và thi công các công trình về tưới tự động</span>
                                    {/* <div className='btn-service w-40 cursor-p mt-2'><span><Link to='/Service'>Tất cả dịch vụ</Link></span></div> */}
                                </div>
                            </div>
                            <img src={Bec} alt="Bec" className='position-absolute service-img' />
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={12} className='d-flex justify-content-between'>
                        <h5 className='cursor-d'><strong>Blog</strong></h5>
                        <span className='cursor-p'><Link to='/Blog'>All</Link></span>
                    </Col>
                    {
                        posts.dataBlog.map((item) =>
                            <Col md={4} key={item.title} className='mt-3'>
                                <Card as={Link} to={`/blog/${convertViToEn(item.title)}`} style={{ width: '100%', border: 'none' }} className="cursor-p h-100 d-flex flex-column align-self-stretch" >
                                    <Card.Img variant="top" src={UrlApi + `/image/` + item.image} className='' />
                                    <div className="mt-auto">
                                        <Card.Body className='px-0'>
                                            <Card.Title style={{ fontSize: '15px' }} className='text-truncate'>{item.title}</Card.Title>
                                            <Card.Text className="text-truncate text-truncate--3 text-justify" >{item.desc}</Card.Text>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        )}

                </Row>
            </Container>
        </>
    )
}

export default Home