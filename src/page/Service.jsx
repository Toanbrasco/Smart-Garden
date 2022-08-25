import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PostContext } from '../Contexts/PostContext'
import Loading from '../Component/Loading/Loading'

import { images, makeNumArr, convertViToEn } from '../Constants'

function Service() {
    const { posts, getService, serviceSearch } = useContext(PostContext)
    console.log(`=> posts`, posts)
    const { totalPage } = posts.pagination

    const limit = 3
    const [pagingActive, setPagingActive] = useState(1)
    const [itemCenter, SetitemCenter] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || 1
    const search = searchParams.get('search')

    const handlePageParam = (num) => {
        if (search !== null) {
            switch (num) {
                case -1:
                    setSearchParams({ search: search, page: pagingActive - 1 })
                    break;
                case 1:
                    setSearchParams({ search: search, page: pagingActive + 1 })
                    break;
                default:
                    break;
            }
        } else {
            switch (num) {
                case -1:
                    setSearchParams({ page: pagingActive - 1 })
                    break;
                case 1:
                    setSearchParams({ page: pagingActive + 1 })
                    break;
                default:
                    break;
            }
        }

    }

    const handleQueryParam = (num) => {
        if (search !== null) {
            setSearchParams({ search: search, page: num })
        } else {
            setSearchParams({ page: num })
        }

    }
    useEffect(() => {
        document.title = "Blog"
        setPagingActive(parseInt(page))
        SetitemCenter(parseInt(page))
        if (search !== null) {
            serviceSearch(search, page, limit)
        } else {
            getService(parseInt(page), limit)
        }

    }, [page, search])

    if (posts.loadingService) {
        return <Loading />
    }
    return (
        <Container>
            <Row>
                <Col md={12} className='mt-4 mb-3 cursor-p'>
                    <span><Link to='/'>Shop</Link> / <strong onClick={() => getService(1, limit)}>Service</strong></span>
                </Col>
            </Row>
            {
                posts.dataService.map((item, index) =>
                    <Link to={`/service/${convertViToEn(item.title)}`}>
                        <Row key={index} className='mt-5'>
                            <Col xs={6} lg={6}>
                                <img src={images[3]} alt="Img" className='w-100 h-100 ' />
                            </Col>
                            <Col xs={6} lg={6}>
                                <Card style={{ width: '100%', border: 'none' }} className="cursor-p h-100">
                                    <Card.Body className='p-0 h-100 d-flex flex-column'>
                                        <Card.Title style={{ fontSize: '15px' }} className='text-truncate'>{item.title}</Card.Title>
                                        <Card.Text className="text-truncate text-truncate--4 text-justify" >{item.desc}</Card.Text>
                                        <Card.Link href="#" className='text-right text-dark mt-auto'>Xem chi tiết</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Link>
                )
            }
            <Row>
                {posts.dataService.length === 0 ?
                    search !== null ?
                        <Col md={12} className=' mt-3'>
                            <div className="w-100 d-flex p-3 flex-column justify-content-center align-items-center bg-light rounded text-center" style={{ width: '100%', height: '250px' }}>
                                <h5 className="mb-1 text-center">Không tìm dịch vụ</h5>
                                <p style={{ fontSize: '18px' }}>
                                    Vui lòng{' '}
                                    <span style={{ fontSize: '18px' }} onClick={() => getService(1, limit)} className='cursor-p text-primary'>xem tất cả dịch vụ</span>
                                    {' '}Hoặc{' '}
                                    <Link to='/'> Trở lại trang chủ</Link>
                                </p>
                            </div>
                        </Col> :
                        <Col md={12} className=' mt-3'>
                            <div className="w-100 d-flex p-3 flex-column justify-content-center align-items-center bg-light rounded text-center" style={{ width: '100%', height: '250px' }}>
                                <h5 className="mb-1 text-center">Hiện chúng tôi Không có dịch vụ nào</h5>
                                <p style={{ fontSize: '18px' }}>
                                    Vui lòng{' '}
                                    <span style={{ fontSize: '18px' }} onClick={() => getService(1, limit)} className='cursor-p text-primary'>xem tất cả dịch vụ</span>
                                    {' '}hoặc{' '}
                                    <Link to='/' className='text-decoration-none'>Trở lại trang chủ</Link>
                                </p>
                            </div>
                        </Col>
                    :
                    posts.pagination.totalPage === 1 ?
                        <div className=" w-100 my-5 d-flex justify-content-center align-items-center">
                            <div onClick={() => handleQueryParam(1)} className="btn-nav hover-sh active">
                                <span>{1}</span>
                            </div>
                        </div> :
                        <Col md={12} className="d-flex justify-content-center mt-3 mb-5">
                            <div onClick={() => handlePageParam(-1)} className={1 === pagingActive ? "d-none" : "btn-nav hover-sh"} ><strong><FontAwesomeIcon icon={faAngleLeft} /> </strong></div>
                            <div onClick={() => handleQueryParam(1)} className={1 + 2 >= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{1}</span></div>
                            <div className={pagingActive <= 3 ? "d-none" : "btn-nav"}><span>...</span></div>
                            {
                                makeNumArr(totalPage).map((item, index) => item <= (itemCenter + 2) && item >= (itemCenter - 2) &&
                                    <div key={index} onClick={() => handleQueryParam(item)} className={pagingActive === item ? "btn-nav active" : "btn-nav hover-sh"}>
                                        <span>{item}</span>
                                    </div>
                                )
                            }
                            <div className={totalPage - 2 <= pagingActive ? "d-none" : "btn-nav "}><span>...</span></div>
                            <div onClick={() => handleQueryParam(totalPage)} className={totalPage - 2 <= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{totalPage}</span></div>
                            <div onClick={() => handlePageParam(1)} className={totalPage === pagingActive ? "d-none" : "btn-nav hover-sh"} ><strong><FontAwesomeIcon icon={faAngleRight} /> </strong></div>
                        </Col>
                }
            </Row>
        </Container>
    )
}

export default Service