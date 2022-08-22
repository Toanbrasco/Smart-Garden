import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// import Data from '../assets/Data/test.json'
import { postReducer } from './Reducers/PostReducer'
import { BLOG_GET, BLOG_UPDATE, BLOG_UPLOAD, SERVICE_GET, SERVICE_UPDATE, SERVICE_UPLOAD, POST_GET_FAIL } from './Reducers/type'
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

    const getService = async (page, limit) => {
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
    const refeshPost = () => {
        // console.log('refeshPost')
        // postDispatch({ type: PRODUCT_REFESH })
    }
    const PostContextData = {
        posts,
        getBlog,
        getService,
        refeshPost,
        serviceSearch,
        blogSearch,
        postDispatch
    }

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider