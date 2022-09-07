import React, { useEffect, useState, useRef, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';

import '../Footer/Footer.css'
import logoFooter from '../../assets/images/LogoFooter.png'
import { UrlApi } from '../../Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationArrow } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading/Loading';
import { ConfigContext } from '../../Contexts/ConfigContext';

function Footer() {
    const { config, getConfig } = useContext(ConfigContext)

    const Location = useLocation().pathname
    // console.log(`=> Location`, Location)
    const [width, setWidth] = useState(400)
    const ref = useRef(null)
    const handleResize = () => {
        setWidth(ref.current.clientWidth)
        window.FB.XFBML.parse();
    }
    useEffect(() => {
        window.addEventListener('load', handleResize)
        window.addEventListener('resize', handleResize)
        return () => {
            window.addEventListener('load', handleResize)
            window.addEventListener('resize', handleResize)
        }
    }, [ref])

    useEffect(() => {
        getConfig()
    }, [])

    if (config.loading) {
        return <Loading />
    }
    return (
        <div className="Footer ">
            {
                Location.includes('/admin') || Location.includes('/cart') || Location.includes('/contact') || Location.includes('/product/') === true || Location.includes('/login') === true
                    || Location.includes('/payment') === true || Location.includes('/infomation') ?
                    <></> :
                    <Container bg='light' className='mt-5 pb-4 cursor-d'>
                        <Row>
                            <Col md={12} className='pt-3 pb-3 border-bottom d-none d-md-block'>
                                <img src={`${UrlApi}/image/${config.data.logo}`} alt="Footer" width='100px' />
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col xs={8} sm={7} md={5} className="d-flex flex-column mt-3">
                                <h5><strong>Thông tin</strong></h5>
                                {
                                    config.data.info.map((item, index) =>
                                        <span key={index}>{item.title} {" : "} {item.info}</span>
                                    )
                                }
                            </Col>
                            <Col xs={4} sm={5} md={3} className="d-flex flex-column mt-3 cursor-p">
                                <h5><strong>Quick Link</strong></h5>
                                <span><Link to="/">Home</Link></span>
                                <span><Link to="/products">Products</Link></span>
                                <span><Link to="/blog">Blog</Link></span>
                                <span><Link to="/service">Service</Link></span>
                                {/* <span as={Link} to='/'>About</span> */}
                                <span><Link to="/contact">Contact</Link></span>
                            </Col>
                            <Col sm={12} md={4} className="d-flex flex-column mt-3" ref={ref}>
                                {/* <h5><strong>FanFage</strong></h5>
                                <div className="fb-page"
                                    data-href={config.data.facebook}
                                    data-width={width}
                                    data-hide-cover="false"
                                    data-show-facepile="false">
                                </div> */}
                                {/* <div className='FaceBook bg-primary w-100 d-flex justify-content-center align-items-center text-white'>
                                    FaceBook
                                </div> */}
                            </Col>
                        </Row>
                    </Container>
            }
        </div >
    )
}

export default Footer