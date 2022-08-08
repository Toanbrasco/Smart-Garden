import React, { useState, useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import Logo from '../../assets/images/Logo.png'
import { personImage } from '../../Constants'

import { faBars, faBox, faChevronLeft, faChevronRight, faClipboardCheck, faGauge, faNewspaper, faUser, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link, Navigate, Outlet } from "react-router-dom"
// import Dashboard from './Dashboard'

import { UserContext } from '../../Contexts/UserContext'

function Admin() {
    const { user } = useContext(UserContext)
    console.log(`=> user`, user)
    const [navSize, setNavSize] = useState(200)
    const arrMenu2 = [
        { name: 'Config', icon: faWrench, component: 1, path: 'config' },
        { name: 'Order', icon: faClipboardCheck, component: 1, path: 'order' },
        { name: 'User', icon: faUser, component: 1, path: 'user' }
    ]
    const handleNav = () => {
        const prodcut = document.getElementById('Product')
        const post = document.getElementById('Post')
        switch (navSize) {
            case 200:
                post.classList.remove('d-block')
                prodcut.classList.remove('d-block')
                setNavSize(100)
                break;
            default:
                post.classList.remove('d-block')
                prodcut.classList.remove('d-block')
                setNavSize(200)
                break;
        }
    }

    const handledropdown = () => {
        const prodcut = document.getElementById('Product')
        const post = document.getElementById('Post')
        post.classList.remove('d-block')
        prodcut.classList.toggle('d-block')
    }

    const handledropdown2 = () => {
        const prodcut = document.getElementById('Product')
        const post = document.getElementById('Post')
        prodcut.classList.remove('d-block')
        post.classList.toggle('d-block')
    }

    const activeSideMenu = () => {
        const sideMenu = document.getElementById('side-menu')
        setNavSize(100)
        sideMenu.classList.toggle('d-block')
    }
    const menuItemStyle = {
        justifyContent: navSize === 100 ? 'center' : 'space-between'
        // height: '40px'
    }

    const iconStyle = {
        fontSize: '1.2rem',
        with: navSize === 100 ? '100%' : '30%'

    }

    const side__navBtn = {
        height: '60px'
    }

    const collapse = {
        width: '200px',
        position: 'absolute',
        top: '0px',
        right: '-200px',
        zIndex: '10',
        color: 'black',
    }

    useEffect(() => {
        document.title = "Admin"
    }, []);

    // if (!user.login) {
    //     return <Navigate to="/login"></Navigate>
    // }
    return (
        <>
            <div className="d-flex">
                <div className='Side__Nav d-none d-md-block' style={{ width: navSize, backgroundColor: '#4e73df' }} id='side-menu'>
                    <div className="w-100 d-flex justify-content-between align-items-center text-black bg-white" style={{ height: '100px' }}>
                        <img src={Logo} alt="Logo" className={navSize === 100 ? 'w-100' : 'w-40'} />
                        <h2 className='m-0 mr-2'>Admin</h2>
                    </div>
                    <div className="side__menu">
                        <div className='d-flex align-items-center text-white w-100 border-bottom p-3 ' style={menuItemStyle}>
                            <Link to='/admin' className='w-100 d-flex justify-content-between align-items-center cursor-p' style={{ flexDirection: navSize === 100 ? 'column' : 'row' }}>
                                <FontAwesomeIcon icon={faGauge} style={iconStyle} className='' />
                                <h6 className={navSize === 100 ? 'm-0 mt-1' : 'w-75 m-0'}>Dashboard</h6>
                            </Link>
                            <div className='w-25 f-flex justify-content-end align-items-center' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                {/* <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.5rem' }} className='' /> */}
                            </div>
                        </div>
                    </div>
                    <div className="side__menu">
                        <div style={menuItemStyle} onClick={() => handledropdown()} className='position-relative'>
                            <div className='d-flex align-items-center text-white w-100 p-3'>
                                <div className='w-100 d-flex justify-content-between align-items-center cursor-p'
                                    style={{ flexDirection: navSize === 100 ? 'column' : 'row' }} >
                                    <FontAwesomeIcon icon={faBox} style={iconStyle} className='' />
                                    <h6 className={navSize === 100 ? 'm-0 mt-1' : 'w-75 m-0'}>Product</h6>
                                </div>
                                <div className='w-25 f-flex justify-content-end align-items-center cursor-p' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.5rem' }} className='' />
                                </div>
                            </div>
                            <div className='collapse-cus d-none p-3' id='Product' style={navSize === 100 ? collapse : {}}>
                                <div className='p-3 d-flex flex-column bg-white rounded shadow cursor-p'>
                                    <Link to='products'>Products</Link>
                                    <Link to='product-upload'> Upload</Link>
                                </div>
                            </div>
                        </div>
                        <div style={menuItemStyle} onClick={() => handledropdown2()} className='position-relative'>
                            <div className='d-flex align-items-center text-white w-100 p-3'>
                                <div className='w-100 d-flex justify-content-between align-items-center cursor-p'
                                    style={{ flexDirection: navSize === 100 ? 'column' : 'row' }} >
                                    <FontAwesomeIcon icon={faNewspaper} style={iconStyle} className='' />
                                    <h6 className={navSize === 100 ? 'm-0 mt-1' : 'w-75 m-0'}>Post</h6>
                                </div>
                                <div className='w-25 f-flex justify-content-end align-items-center cursor-p' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.5rem' }} className='' />
                                </div>
                            </div>
                            <div className='collapse-cus d-none p-3' id='Post' style={navSize === 100 ? collapse : {}}>
                                <div className='p-3 d-flex flex-column bg-white rounded shadow cursor-p'>
                                    <Link to='post'>Post</Link>
                                    <Link to='blog-upload'>Blog Upload</Link>
                                    <Link to='service-upload'> services Upload</Link>
                                </div>
                            </div>
                        </div>
                        {
                            arrMenu2.map((item, index) =>
                                <Link to={item.path} key={index} className='d-flex align-items-center text-white w-100 p-3' style={menuItemStyle} >
                                    <div className='w-100 d-flex justify-content-between align-items-center cursor-p' style={{ flexDirection: navSize === 100 ? 'column' : 'row' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={item.icon} style={iconStyle} className='' />
                                        <h6 className={navSize === 100 ? 'm-0 mt-1' : 'w-75 m-0'}>{item.name}</h6>
                                    </div>
                                    <div className='w-25 f-flex justify-content-end align-items-center' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                        {/* <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.5rem' }} className='' /> */}
                                    </div>
                                </Link>
                                // <div key={index} style={menuItemStyle} onClick={handledropdown} className='position-relative' ref={element}>
                                //     <div className='d-flex align-items-center text-white w-100 p-3'>
                                //         <div className='w-100 d-flex justify-content-between align-items-center cursor-p'
                                //             style={{ flexDirection: navSize === 100 ? 'column' : 'row' }} >
                                //             <FontAwesomeIcon icon={item.icon} style={iconStyle} className='' />
                                //             <h6 className={navSize === 100 ? 'm-0 mt-1' : 'w-75 m-0'}>{item.name}</h6>
                                //         </div>
                                //         <div className='w-25 f-flex justify-content-end align-items-center cursor-p' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                //             <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.5rem' }} className='' />
                                //         </div>
                                //     </div>
                                //     <div className='collapse-cus d-none p-3' id={item.name} style={navSize === 100 ? collapse : {}}>
                                //         <div className='p-3 d-flex flex-column bg-white rounded shadow cursor-p ' >
                                //             {item.path.map((link, index) =>
                                //                 <Link key={link + index} to={link}>{link}</Link>
                                //             )}
                                //         </div>
                                //     </div>
                                // </div>
                            )
                        }


                    </div>

                    <div className="nav__side-btn justify-content-center align-items-center w-100 border-top d-none d-md-flex" style={side__navBtn}>
                        <div className='rounded-circle d-flex justify-content-center align-items-center text-white cursor-p' onClick={() => handleNav()}>
                            <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1rem' }} className={navSize === 200 ? 'd-none' : ''} />
                            <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '1rem' }} className={navSize === 100 ? 'd-none' : ''} />
                        </div>
                    </div>
                </div>
                <Col className=''>
                    <Row>
                        <Col md={12} className='bg-white nav__header d-flex justify-content-between align-items-center p-3' style={{ height: '100px' }}>
                            <div onClick={() => activeSideMenu()} >
                                <FontAwesomeIcon icon={faBars} style={{ fontSize: '1.5rem' }} className='d-block d-md-none' />
                            </div>
                            {/* <h1>Admin</h1> */}
                            <div className='h-100 d-flex justify-content-between align-items-center py-2 pl-3 border-left'>
                                <span>Admin</span>
                                <div className='h-50 rounded-circle shadowml ml-3' style={{ width: '25px' }}>
                                    <img src={personImage} alt="personImage" className='W-100 h-100 rounded-circle shadow' />
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>
                            {/* <Row> */}
                            {
                                user.login ? <Outlet /> : <Navigate to='/login' />
                            }

                            {/* </Row> */}
                        </Col>
                    </Row>
                </Col>
            </div >
        </>
    )
}

export default Admin