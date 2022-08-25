import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import '../Dropzone/Dropzone.css';
import { useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons'


const Dropzone = (props) => {
    const location = useLocation()
    const { validFiles, handleValidFiles, upload, imgOld, updateImgOld, btn, multiFile } = props
    const fileInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [imageOld, setImageOld] = useState(imgOld)
    // const [Count, setCount] = useState('')
    const urlImage = 'http://localhost:5000/image/'
    // const [validFiles, setValidFiles] = useState([]);

    // const { validFiles, errorMessage } = props
    // useEffect(() => {
    //     console.log('count', Count)
    //     setCount('Alo')
    // }, [updateImgOld])

    useEffect(() => {
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        handleValidFiles([...filteredArr]);
    }, [selectedFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
    }

    const handledrag = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            }
            else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    // const fileSize = (size) => {
    //     if (size === 0) {
    //         return '0 Bytes';
    //     }
    //     const k = 1024;
    //     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    //     const i = Math.floor(Math.log(size) / Math.log(k));
    //     return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    // }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
        const index = validFiles.findIndex(e => e.name === name);
        const index2 = selectedFiles.findIndex(e => e.name === name);
        const index3 = unsupportedFiles.findIndex(e => e.name === name);
        validFiles.splice(index, 1);
        selectedFiles.splice(index2, 1);
        handleValidFiles([...validFiles]);
        setSelectedFiles([...selectedFiles]);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }


    const uploadFiles = () => {
        upload()
        validFiles.length = 0;
        handleValidFiles([...validFiles]);
        setSelectedFiles([...validFiles]);
        setUnsupportedFiles([...validFiles]);
    }

    // const uploadFiles = async () => {
    //     for (let i = 0; i < validFiles.length; i++) {
    //         const formData = new FormData();
    //         formData.append('image', validFiles[i]);
    //         formData.append('key', '');

    //         axios.post('https://api.imgbb.com/1/upload', formData, {
    //             onUploadProgress: (progressEvent) => {
    //                 const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
    //                 progressRef.current.innerHTML = `${uploadPercentage}%`;
    //                 progressRef.current.style.width = `${uploadPercentage}%`;

    //                 if (uploadPercentage === 100) {
    //                     uploadRef.current.innerHTML = 'File(s) Uploaded';
    //                     validFiles.length = 0;
    //                     setValidFiles([...validFiles]);
    //                     setSelectedFiles([...validFiles]);
    //                     setUnsupportedFiles([...validFiles]);
    //                 }
    //             },
    //         })
    //             .catch(() => {
    //                 uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
    //                 progressRef.current.style.backgroundColor = 'red';
    //             })
    //     }
    // }

    // const closeUploadModal = () => {
    //     uploadModalRef.current.style.display = 'none';
    // }
    const removeImgOld = (img) => {
        const index = imageOld.findIndex(i => i === img)
        imageOld.splice(index, 1)
        setImageOld([...imageOld])
        updateImgOld([...imageOld])
    }
    const checkLocation = () => {
        if (location.pathname.includes('/editBlog/')) {
            return 'blog/'
        }
        if (location.pathname.includes('/editService/')) {
            return 'service/'
        }
        if (location.pathname.includes('/editproduct/')) {
            return 'product/'
        }
        // if(location.pathname.includes('/editBlog/')){
        //     return 'blog/'
        // }
    }
    return (
        <div className="container-dropzone">
            {unsupportedFiles.length ? <p>Hãy xoá những files không phù hợp</p> : ''}
            <div className="file-display-container">
                {
                    imageOld.length > 30 ?
                        <div className="file-status-bar" style={validFiles.length ? { display: 'none' } : { display: 'flex' }}>
                            <div className="file-logo">
                                <img src={urlImage + imageOld} alt="img-input" />
                                <div className="file-type">{fileType(imageOld)}</div>
                                <div className="icon__remove">
                                    <FontAwesomeIcon icon={faXmark} onClick={() => removeImgOld(imageOld)} />
                                </div>
                            </div>
                        </div> :
                        // <div style={validFiles.length ? { display: 'none' } : { display: 'flex' }}>
                        <>
                            {
                                imageOld.map((img, index) =>
                                    <div className="file-status-bar" key={index}>
                                        <div className="file-logo">
                                            <img src={urlImage + img} alt="img-input" />
                                            <div className="file-type">{fileType(img)}</div>
                                            <div className="icon__remove">
                                                <FontAwesomeIcon icon={faXmark} onClick={() => removeImgOld(img)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }</>
                    // </div>
                }
                {
                    validFiles.map((data, i) =>
                        <div className="file-status-bar" key={i}>
                            <div className="file-logo">
                                <img src={URL.createObjectURL(data)} alt="img-input" />
                                <div className="file-type">{fileType(data.name)}</div>
                                <div className="icon__remove">
                                    <FontAwesomeIcon icon={faXmark} onClick={() => removeFile(data.name)} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="drop-container"
                onDragOver={handledrag}
                onDragEnter={handledrag}
                onDragLeave={handledrag}
                onDrop={fileDrop}
                onClick={fileInputClicked}>
                <div className="drop-message">
                    <div className="upload-icon">
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        {/* <ion-icon name="push-outline"></ion-icon> */}
                    </div>
                    <span>Kéo & Thả files ở đây Hoặc nhấn để chọn file</span>
                </div>
                <input
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    accept="image/*"
                    multiple={multiFile}
                    onChange={filesSelected} />
            </div>
            <div className="button-file" style={btn ? { display: 'block' } : { display: 'none' }}>
                {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload Files</button> : ''}
            </div>

        </div>
    );
}
Dropzone.propTypes = {
    validFiles: PropTypes.array,
    handleValidFiles: PropTypes.func,
    upload: PropTypes.func,
    imgOld: PropTypes.array,
    btn: PropTypes.bool,
    multiFile: PropTypes.bool
};
Dropzone.defaultProps = {
    validFiles: [],
    handleValidFiles: () => { },
    upload: () => { },
    imgOld: [],
    btn: true,
    multiFile: true
}

export default Dropzone;