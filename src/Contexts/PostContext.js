import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// import Data from '../assets/Data/test.json'
import { postReducer } from './Reducers/PostReducer'
import { BLOG_GET, BLOG_UPDATE, BLOG_UPLOAD, SERVICE_GET, SERVICE_UPDATE, SERVICE_UPLOAD, POST_GET_FAIL, POST_REFESH, BLOG_DETAIL, SERVICE_DETAIL } from './Reducers/type'
import { UrlApi, convertViToEn } from "../Constants";


export const PostContext = createContext()
const PostContextProvider = ({ children }) => {
    const [posts, postDispatch] = useReducer(postReducer, {
        loadingBlog: true,
        loadingService: true,
        dataBlog: [],
        dataService: [],
        pagination: {},
        error: null
    })

    const getBlog = async (page, limit) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/blog?page=${page}&limit=${limit}`)
            // console.log(`=> response blog`, response.data)
            if (response.data.success) {
                postDispatch({ type: BLOG_GET, payload: response.data })
            } else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const blogSearch = async (searchText, page, limit) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/blog/search?page=${page}&limit=${limit}&searchtext=${searchText}`)
            if (response.data.success) {
                postDispatch({ type: BLOG_GET, payload: response.data })
            } else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }
    const getBlogDetail = async (idBlog) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/blog/id?id=${idBlog}`)
            // console.log(`=> response Detail`, response.data)
            if (response.data.success) {
                postDispatch({ type: BLOG_DETAIL, payload: response.data })
            } else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const getServiceDetail = async (idService) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/service/id?id=${idService}`)
            if (response.data.success) {
                postDispatch({ type: SERVICE_DETAIL, payload: response.data })
            } else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const getService = async (page, limit) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/service?page=${page}&limit=${limit}`)
            // console.log(`=> response service`, response.data)
            if (response.data.success) {
                postDispatch({ type: SERVICE_GET, payload: response.data })
            }
            else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const serviceSearch = async (searchText, page, limit) => {
        refeshPost()
        try {
            const response = await axios.get(`${UrlApi}/api/posts/service/search?page=${page}&limit=${limit}&searchtext=${searchText}`)
            // console.log(`=> response blog`, response.data)
            if (response.data.success) {
                postDispatch({ type: SERVICE_GET, payload: response.data })
            } else {
                postDispatch({ type: POST_GET_FAIL, payload: response.data })
            }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }
    const blogAdd = async (Blog) => {
        try {
            const response = await axios.post(`${UrlApi}/api/posts/blog`, Blog)
            // console.log(`=> response blog`, response.data)
            return response.data
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }
    const serviceAdd = async (Service) => {
        try {
            const response = await axios.post(`${UrlApi}/api/posts/service`, Service)
            // console.log(`=> response blog`, response.data)
            return response.data
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }
    const deleteBlog = async (id) => {
        try {
            const response = await axios.delete(`${UrlApi}/api/posts/blog/${id}`)
            // console.log(`=> response blog`, response.data)
            return { blogSuccess: response.data.success, blogMessage: response.data.message }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }
    const deleteService = async (id) => {
        try {
            const response = await axios.delete(`${UrlApi}/api/posts/service/${id}`)
            // console.log(`=> response blog`, response.data)
            return { serviceSuccess: response.data.success, serviceMessage: response.data.message }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const updateBlog = async (updateBlog) => {
        console.log(`=> updateBlog`, updateBlog)
        try {
            const response = await axios.put(`${UrlApi}/api/posts/blog`, updateBlog)
            // console.log(`=> response blog`, response.data)
            return { blogSuccess: response.data.success, blogMessage: response.data.message }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }
    const updateService = async (updateService) => {
        try {
            const response = await axios.put(`${UrlApi}/api/posts/service`, updateService)
            // console.log(`=> response blog`, response.data)
            return { serviceSuccess: response.data.success, serviceMessage: response.data.message }
        } catch (error) {
            postDispatch({ type: POST_GET_FAIL })
        }
    }

    const refeshPost = () => {
        console.log('refeshPost')
        postDispatch({ type: POST_REFESH })
    }
    const PostContextData = {
        posts,
        getBlog,
        getService,
        refeshPost,
        serviceSearch,
        blogSearch,
        getBlogDetail,
        getServiceDetail,
        blogAdd,
        serviceAdd,
        deleteBlog,
        deleteService,
        updateService,
        updateBlog,
        postDispatch,
    }

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider