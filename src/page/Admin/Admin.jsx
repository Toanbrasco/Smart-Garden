import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Logo from '../../assets/images/Logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLineChart } from '@fortawesome/free-solid-svg-icons'



function Admin() {
    const [navSize, setNavSize] = useState(200)
    const arrMenu = ['Home', 'Product', 'Table', 'Config']
    const handleNav = () => {
        switch (navSize) {
            case 200:
                setNavSize(75)
                break;
            default:
                setNavSize(200)
                break;
        }
    }

    return (
        <>
            <div className="d-flex">
                <div className='Side-Nav vh-100 bg-primary p-2' style={{ width: navSize }}>
                    <div className="w-100 d-flex justify-content-between align-items-center p-2 text-white">
                        {/* <img src={Logo} alt="Logo" className='w-30' /> */}
                        <h2>Admin</h2>
                    </div>
                    <div className="">
                        {
                            arrMenu.map((item, index) =>
                                <div className='d-flex  align-items-center  py-2 text-white' key={index} style={navSize === 75 ? { justifyContent: 'center' } : { justifyContent: 'space-between' }}>
                                    <FontAwesomeIcon icon={faHome} style={{ fontSize: '1rem' }} className='w-30' />
                                    <div className='w-75 justify-content-center align-items-center' style={navSize === 75 ? { display: 'none' } : { display: 'flex' }}>
                                        <h6 className='m-0'>{item}</h6>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <button className="btn btn-success" onClick={() => handleNav()}>Close</button>
                </div>
                <Col className='bg-danger'>
                    <Row>
                        <Col md={12} className='bg-white'>
                            <h1>Admin</h1>
                        </Col>
                    </Row>
                </Col>
            </div>
        </>
    )
}

export default Admin