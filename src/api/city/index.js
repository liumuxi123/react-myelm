import request from "@utils/request.js";


export function getCityInfo(id) {
    return request({
        url: `/api/v1/cities/${id}`,
        method: 'get'
    })
}

export function getPosition(params) {
    return request({
        url: `/api/v1/pois`,
        method: 'get',
        params
    })
}