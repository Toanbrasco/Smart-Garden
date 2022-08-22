import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faCheck, faXmark, faAngleLeft, faAngleRight, faArrowDownLong, faArrowUpLong, faMagnifyingGlass, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useSearchParams } from 'react-router-dom'
import { makeNumArr, convertViToEn } from '../../Constants'
import { ProductContext } from '../../Contexts/ProductContext'
import Loading from '../../Component/Loading/Loading'

function AdProduct() {
    const { products, getProducts, handleCategory, productSearch } = useContext(ProductContext)
    // console.log(`=> products`, products)
    const [limit, setLimit] = useState(10)
    const { totalPage } = products.pagination

    const [pagingActive, setPagingActive] = useState(1)
    const [itemCenter, SetitemCenter] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectValue, setSelectValue] = useState(0)

    const [Sort, setSort] = useState(0)
    console.log(`=> Sort`, Sort)

    const page = searchParams.get('page') || ''
    const category = searchParams.get('category')
    const search = searchParams.get('search')


    const handlePageParam = (num) => {
        if (category !== null) {
            switch (num) {
                case -1:
                    setSearchParams({ category: category, page: pagingActive - 1 || 1 })
                    break;
                case 1:
                    setSearchParams({ category: category, page: pagingActive + 1 || 1 })
                    break;
                default:
                    break;
            }
        } else {
            if (search !== null) {
                switch (num) {
                    case -1:
                        setSearchParams({ search: search, page: pagingActive - 1 || 1 })
                        break;
                    case 1:
                        setSearchParams({ search: search, page: pagingActive + 1 || 1 })
                        break;
                    default:
                        break;
                }
            } else {
                switch (num) {
                    case -1:
                        setSearchParams({ page: pagingActive - 1 || 1 })
                        break;
                    case 1:
                        setSearchParams({ page: pagingActive + 1 || 1 })
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const handleQueryParam = (num) => {
        if (category !== null) {
            setSearchParams({ category: category, page: num })
        } else {
            if (search !== null) {
                setSearchParams({ search: search, page: num })
            } else {
                setSearchParams({ page: num })
            }
        }
    }
    useEffect(() => {
        // getProducts(parseInt(page) || 1, limit, parseInt(selectValue))
        // console.log(selectValue)
        if (category !== null) {
            handleCategory(category, page || 1, limit, parseInt(Sort))
        } else {
            if (search !== null) {
                productSearch(search, page || 1, limit, parseInt(Sort))
            } else {
                getProducts(parseInt(page) || 1, limit, parseInt(Sort))
            }
        }
    }, [Sort, limit])

    useEffect(() => {
        document.title = "Products"
        if (search !== null) {
            productSearch(search, page || 1, limit, parseInt(Sort))
        } else {
            getProducts(parseInt(page) || 1, limit, parseInt(Sort))
        }
    }, []);

    useEffect(() => {
        if (search !== null) {
            productSearch(search, page || 1, limit, parseInt(Sort))
        }
    }, [search])

    useEffect(() => {
        setPagingActive(parseInt(page) || 1)
        SetitemCenter(parseInt(page) || 1)
        if (category !== null) {
            handleCategory(category, page || 1, limit, parseInt(Sort))
        } else {
            if (search !== null) {
                productSearch(search, page || 1, limit, parseInt(Sort))
            } else {
                getProducts(parseInt(page) || 1, limit, parseInt(Sort))
            }
        }
    }, [page])
    const handleSort = (text) => {
        switch (text) {
            case 'NAME':
                if (Sort === 0) {
                    setSort(5)
                } else {
                    if (Sort === 5) {
                        setSort(6)
                    } else {
                        setSort(0)
                    }
                }
                break;
            case 'PRICE':
                if (Sort === 0) {
                    setSort(1)
                } else {
                    if (Sort === 1) {
                        setSort(2)
                    } else {
                        setSort(0)
                    }
                }
                break;
            case 'DISCOUNT':
                if (Sort === 0) {
                    setSort(3)
                } else {
                    if (Sort === 3) {
                        setSort(4)
                    } else {
                        setSort(0)
                    }
                }
                break;

            default:
                setSort(0)
                break;
        }
    }
    const checkParams = () => {
        const searchInput = document.getElementById('searchInput')
        if (searchParams.has('search')) {
            searchParams.delete('search');
        }
        if (searchParams.has('page')) {
            searchParams.delete('page');
        }
        setSearchParams(searchParams);
        getProducts(parseInt(page) || 1, limit, parseInt(Sort))
        searchInput.value = ''
    }
    const [searchText, setSearchText] = useState('')
    const handleSearch = () => {
        if (searchText.length !== 0) {
            setSearchParams({ search: searchText, page: 1 })
        }
    }

    if (products.loading || products.pagination === undefined) {
        return <Loading />
    }
    return (
        <Container fluid bg="light">
            <Row className='mt-3'>
                <Col md={12} className='d-flex align-items-center' >
                    <h2 className='m-0'>Product</h2>
                    <Button className='ml-3' onClick={() => checkParams()}><FontAwesomeIcon icon={faRotateRight} /></Button>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='my-3 cursor-p d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span>Hiển thị</span>
                        <Form.Group className='mx-3'>
                            <Form.Control as="select" onChange={(e) => setLimit(e.target.value)}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Form.Control>
                        </Form.Group>
                        <span>sản phẩm</span>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Form.Group className="mr-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Search..." onChange={(e) => setSearchText(e.target.value)} id='searchInput' />
                        </Form.Group>
                        <Button onClick={() => handleSearch()}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table responsive="md" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className='cursor-p' onClick={() => handleSort('NAME')}>
                                    <div className="d-flex align-items-center">
                                        Tên sản phẩm
                                        <div className='ml-1 d-flex justify-content-center align-items-center'>
                                            <FontAwesomeIcon icon={faArrowUpLong} style={{ fontSize: '12px', color: Sort === 5 ? 'black' : 'gray' }} />
                                            <FontAwesomeIcon icon={faArrowDownLong} style={{ fontSize: '12px', color: Sort === 6 ? 'black' : 'gray' }} />
                                        </div>
                                    </div>
                                </th>
                                <th className='cursor-p' onClick={() => handleSort('PRICE')}>
                                    <div className="d-flex align-items-center">
                                        Giá
                                        <div className='ml-1 d-flex justify-content-center align-items-center'>
                                            <FontAwesomeIcon icon={faArrowUpLong} style={{ fontSize: '12px', color: Sort === 2 ? 'black' : 'gray' }} />
                                            <FontAwesomeIcon icon={faArrowDownLong} style={{ fontSize: '12px', color: Sort === 1 ? 'black' : 'gray' }} />
                                        </div>
                                    </div>
                                </th>
                                <th className='cursor-p' onClick={() => handleSort('DISCOUNT')}>
                                    <div className="d-flex align-items-center">
                                        Discount
                                        <div className='ml-1 d-flex justify-content-center align-items-center'>
                                            <FontAwesomeIcon icon={faArrowUpLong} style={{ fontSize: '12px', color: Sort === 3 ? 'black' : 'gray' }} />
                                            <FontAwesomeIcon icon={faArrowDownLong} style={{ fontSize: '12px', color: Sort === 4 ? 'black' : 'gray' }} />
                                        </div>
                                    </div>
                                </th>
                                <th>Category</th>
                                <th>Category</th>
                                <th>type</th>
                                <th>Public</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.data.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price.base}</td>
                                        <td>{item.price.discount}</td>
                                        <td>{item.category.main} </td>
                                        <td>{item.category.detail}</td>
                                        <td>{item.type}</td>
                                        <td>{item.isPublic ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}</td>
                                        <td><Link to={'/admin/edit-product/' + convertViToEn(item.name)}> <FontAwesomeIcon icon={faPenToSquare} /></Link></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </Table>
                </Col>
                <Col md={12} className="d-flex justify-content-start mt-3 mb-5">
                    <div onClick={() => handlePageParam(-1)} className={1 === pagingActive ? "d-none" : "btn-nav hover-sh"} ><strong><FontAwesomeIcon icon={faAngleLeft} /> </strong></div>
                    <div onClick={() => handleQueryParam(1)} className={1 + 2 >= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{1}</span></div>
                    <div className={pagingActive <= 3 ? "d-none" : "btn-nav"}><span>...</span></div>
                    {
                        makeNumArr(totalPage).map((item, index) => item <= (itemCenter + 2) && item >= (itemCenter - 2) &&
                            <div key={index} onClick={() => handleQueryParam(item)} className={pagingActive === item ? "btn-nav active" : "btn-nav hover-sh"}><span>{item}</span></div>
                        )
                    }
                    <div className={totalPage - 2 <= pagingActive ? "d-none" : "btn-nav "}><span>...</span></div>
                    <div onClick={() => handleQueryParam(totalPage)} className={totalPage - 2 <= pagingActive ? "d-none" : "btn-nav hover-sh"}><span>{totalPage}</span></div>
                    <div onClick={() => handlePageParam(1)} className={totalPage === pagingActive ? "d-none" : "btn-nav hover-sh"} ><strong><FontAwesomeIcon icon={faAngleRight} /> </strong></div>
                </Col>
            </Row>
        </Container>
    )
}

export default AdProduct