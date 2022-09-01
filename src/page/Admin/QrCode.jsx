import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import QRCode from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'


function QrCode() {
    const [value, setValue] = useState('')
    const [text, setText] = useState('This is title')

    const downloadQR = () => {
        const canvas = document.getElementById('qrcode');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        console.log('pngUrl', pngUrl);
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'SmartGardenQrCode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Container fluid>
            <Row>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3 ' >
                    <h3>QR Code</h3>
                </Col>
                <Col md={3}>
                    <QRCode
                        id='qrcode'
                        className='border'
                        value={value}
                        size={290}
                        level={'H'}
                        includeMargin={true}
                    />
                </Col>
                <Col md={9}>
                    <Form.Group className="mb-2">
                        <Form.Label>Nội dung QR code</Form.Label>
                        <Form.Control size="sm" type="text" defaultValue={value} onChange={(e) => setValue(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Nội dung QR code</Form.Label>
                        <Button variant='primary' className='ml-3' onClick={downloadQR} ><FontAwesomeIcon icon={faDownload} /></Button>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    )
}

export default QrCode