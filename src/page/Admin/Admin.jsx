import React, { useState, useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import Logo from '../../assets/images/Logo.png'
import { personImage } from '../../Constants'

import { faBars, faBox, faChevronLeft, faChevronRight, faClipboardCheck, faGauge, faNewspaper, faUser, faWrench, faArrowRightFromBracket,faQrcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link, Navigate, Outlet } from "react-router-dom"
// import Dashboard from './Dashboard'

import { UserContext } from '../../Contexts/UserContext'
import Loading from '../../Component/Loading/Loading'

function Admin() {
    const { user, loadUser, logoutUser } = useContext(UserContext)
    const [navSize, setNavSize] = useState(200)
    // const arrMenu2 = [
    //     { name: 'Config', icon: faWrench, component: 1, path: 'config' },
    //     { name: 'Order', icon: faClipboardCheck, component: 1, path: 'order' },
    //     { name: 'User', icon: faUser, component: 1, path: 'user' }
    // ]
    const arrMenu = [
        // { name: 'Home', icon: faHome },
        // { name: 'Table', icon: faTableList },
        { name: 'Product', icon: faBox, component: 2, path: ['products', 'product-upload'] },
        { name: 'Post', icon: faNewspaper, component: 2, path: ['post', 'blog-upload', 'services-upload'] },
        { name: 'Config', icon: faWrench, component: 1, path: 'config' },
        { name: 'Order', icon: faClipboardCheck, component: 1, path: 'order' },
        { name: 'User', icon: faUser, component: 1, path: 'user' },
        { name: 'QRCode', icon: faQrcode, component: 1, path: 'qrcode' }
    ]
    const handleNav = () => {
        switch (navSize) {
            case 200:
                itemDropdown.forEach(item => item.classList.remove('d-block'))
                setNavSize(100)
                break;
            default:
                itemDropdown.forEach(item => item.classList.remove('d-block'))
                setNavSize(200)
                break;
        }
    }

    const activeSideMenu = () => {
        const sideMenu = document.getElementById('side-menu')
        setNavSize(100)
        sideMenu.classList.toggle('d-block')
    }
    const menuItemStyle = {
        justifyContent: navSize === 100 ? 'center' : 'space-between',
        zIndex: '10'
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
        setItemDropdown(document.querySelectorAll('#itemDropdown'))
        loadUser()
    }, []);
    const [itemDropdown, setItemDropdown] = useState([])

    const handledropdown = (index) => {
        if (itemDropdown[index].classList.value.includes("d-block")) {
            itemDropdown[index].classList.remove("d-block");
        } else {
            itemDropdown.forEach((item) => {
                item.classList.remove("d-block");
            });
            itemDropdown[index].classList.add("d-block");
        }
    }
    // if (!user.login) {
    //     return <Navigate to="/login"></Navigate>
    // }
    // if (user.authLoading) {
    //     return <Loading />
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
                                <h6 className={navSize === 100 ? 'm-0 mt-1 text-white' : 'w-75 m-0 text-white'}>Dashboard</h6>
                            </Link>
                            <div className='w-25 f-flex justify-content-end align-items-center' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                {/* <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.5rem' }} className='' /> */}
                            </div>
                        </div>
                    </div>
                    <div className="side__menu">
                        {arrMenu.map((item, index) => item.component === 2 ?
                            <div div key={index} style={menuItemStyle} onClick={() => handledropdown(index)} className='position-relative' id='slideMenuItem'>
                                <div className='d-flex align-items-center text-white w-100 p-3'>
                                    <div className='w-100 d-flex justify-content-between align-items-center cursor-p'
                                        style={{ flexDirection: navSize === 100 ? 'column' : 'row' }} >
                                        <FontAwesomeIcon icon={faBox} style={iconStyle} className='' />
                                        <h6 className={navSize === 100 ? 'm-0 mt-1' : 'w-75 m-0'}>{item.name}</h6>
                                    </div>
                                    <div className='w-25 f-flex justify-content-end align-items-center cursor-p' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '0.5rem' }} className='' />
                                    </div>
                                </div>
                                <div className='collapse-cus d-none p-3' id='itemDropdown' style={navSize === 100 ? collapse : {}}>
                                    <div className='p-3 d-flex flex-column bg-white rounded shadow cursor-p'>
                                        {
                                            item.path.map((item, index) =>
                                                <Link key={index} to={item} className='text-capitalize'>{item}</Link>
                                            )
                                        }
                                    </div>
                                </div>
                            </div> :
                            <Link to={item.path} key={index} className='d-flex align-items-center text-white w-100 p-3' style={menuItemStyle} onClick={() => { itemDropdown.forEach(item => item.classList.remove('d-block')) }}>
                                <div className='w-100 d-flex justify-content-between align-items-center cursor-p' style={{ flexDirection: navSize === 100 ? 'column' : 'row' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={item.icon} style={iconStyle} className='' />
                                    <h6 className={navSize === 100 ? 'm-0 mt-1' : 'w-75 m-0'}>{item.name}</h6>
                                </div>
                                <div className='w-25 f-flex justify-content-end align-items-center' style={navSize === 100 ? { display: 'none' } : { display: 'flex' }}>
                                </div>
                            </Link>
                        )}
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
                            <div className='h-100 d-flex justify-content-between align-items-center py-2 pl-3 border-left'>
                                <span>{user.user}</span>
                                {/* <div className='h-50 rounded-circle shadowml ml-3' style={{ width: '25px' }}>
                                    <img src={personImage} alt="personImage" className='W-100 h-100 rounded-circle shadow' />

                                </div> */}
                                <div className='ml-3' onClick={() => logoutUser()}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>

                            {
                                user.isAuthenticated ? <Outlet /> : <Navigate to='/login' />
                            }
                        </Col>
                    </Row>
                </Col>
            </div >
        </>
    )
}

export default Admin