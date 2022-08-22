import { BLOG_GET, BLOG_UPDATE, BLOG_UPLOAD, SERVICE_GET, SERVICE_UPDATE, SERVICE_UPLOAD, POST_GET_FAIL, POST_REFESH, BLOG_DETAIL, SERVICE_DETAIL } from './type'
import { convertViToEn } from '../../Constants'

export const postReducer = (state, action) => {
    const { type, payload } = action

    // loadingBlog: true,
    //     loadingService: true,
    //         dataBlog: [],
    //             dataService: [],
    switch (type) {
        case BLOG_GET:
            return {
                ...state,
                loadingBlog: false,
                dataBlog: payload.data,
                pagination: payload.pagination
            }

        case BLOG_DETAIL:
            return {
                ...state,
                loadingService: true,
                loadingBlog: false,
                dataBlog: payload.data,
            }
        case SERVICE_GET:
            return {
                ...state,
                loadingService: false,
                dataService: payload.data,
                pagination: payload.pagination
            }

        case SERVICE_DETAIL:
            return {
                ...state,
                loadingBlog: true,
                loadingService: false,
                dataService: payload.data,
            }

        case POST_GET_FAIL:
            return {
                ...state,
                loadingBlog: true,
                loadingService: true
            }
        case POST_REFESH:
            return {
                loadingBlog: true,
                loadingService: true,
                dataBlog: [],
                dataService: [],
                pagination: {}
            }

        default:
            console.log('Default')
            return
    }
}
