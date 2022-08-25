import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import QRCode from 'qrcode.react';

const downloadQR = () => {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    console.log('pngUrl', pngUrl);
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'viblo-tranchien.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

function QrCode() {
    const [value, setValue] = useState('alo')
    const [text, setText] = useState('This is title')

    return (
        <Container fluid>
            <Row>
                <Col md={12} className='d-flex justify-content-between align-items-center mt-3 ' >
                    <h3>QR Code</h3>
                </Col>
                <Col md={12}>
                    <input type="text" name="text" id="" defaultValue={value} onChange={(e) => setValue(e.target.value)} />
                    <QRCode
                        id='qrcode'
                        value={value}
                        size={290}
                        level={'H'}
                        includeMargin={true}
                    />
                    <br />
                    <a onClick={downloadQR}> Download QR </a>
                </Col>
            </Row>
        </Container>
    )
}

export default QrCode