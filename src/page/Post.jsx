import React, { useEffect, useContext } from 'react'
// import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import parse from 'html-react-parser';
import { PostContext } from '../Contexts/PostContext'
import { Link, useLocation, useParams } from 'react-router-dom'
import Loading from '../Component/Loading/Loading';
import { DayFormat } from '../Constants'


function Post() {
    const { posts, getBlogDetail, getServiceDetail } = useContext(PostContext)
    const Location = useLocation().pathname
    const { postName } = useParams()

    useEffect(() => {
        if (Location.includes('/blog/')) {
            document.title = "Blog"
            getBlogDetail(postName)
        } else {
            document.title = "Service"
            getServiceDetail(postName)
        }
    }, []);

    if (posts.loadingBlog && posts.loadingService) {
        return <Loading />
    }
    return (
        <Container>
            {
                Location.includes('/blog/') ?
                    <Row>
                        <Col md={12} className='mt-3 cursor-p'>
                            <span><Link to='/'>Shop</Link> /<Link to='/blog'><strong> Blog</strong></Link></span>
                        </Col>
                        <Col md={12} className='my-3'>
                            <strong>{posts.dataBlog[0].title}</strong>
                        </Col>
                        <Col md={12} className=''>
                            {parse(posts.dataBlog[0].content)}
                        </Col>
                        <Col md={12} className='mt-3 mb-5 d-flex justify-content-between align-items-center'>
                            <Link to='/blog' className='text-dark'>Các bài viết khác</Link>
                            <div className='font-weight-bold'>
                                <span><strong>Viết ngày: </strong></span>
                                {DayFormat(posts.dataBlog[0].createdAt)}
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col md={12} className='mt-3 cursor-p'>
                            <span><Link to='/'>Shop</Link> /<Link to='/service'><strong> Service</strong></Link></span>
                        </Col>
                        <Col md={12} className='my-3 font-weight-bold'>
                            {posts.dataService[0].title}
                        </Col>
                        <Col md={12} className=''>
                            {parse(posts.dataService[0].content)}
                        </Col>
                        <Col md={12} className='mt-3 mb-5 d-flex justify-content-between align-items-center'>
                            <Link to='/service' className='text-dark'>Các Dịch vụ khác </Link>
                            <div className=''>
                                <span><strong>Viết ngày: </strong></span>
                                {DayFormat(posts.dataService[0].createdAt)}
                            </div>
                        </Col>
                    </Row>
            }
        </Container>
    )
}

export default Post