import React from 'react'

function Loading() {
    const LoadingStyle = {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: '0px',
        left: '0px',
        zIndex: '10',

    }
    return (
        <div style={LoadingStyle}>
            <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-white">
                <div className="spinner-border" role="status" style={{ width: '50px', height: '50px' }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <h1>Alo</h1>
        </div>
    )
}

export default Loading