import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'

function Post() {

    useEffect(() => {
        document.title = "Post"
    }, []);
    return (
        <Container>
            <Row>
                <Col md={12}>
                    Post
                </Col>
            </Row>
        </Container>
    )
}

export default Post