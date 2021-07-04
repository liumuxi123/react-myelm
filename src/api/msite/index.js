import request from "@utils/request.js";


export function getFoodCategory() {
    return request({
        url: `/api/v2/index_entry`,
        method: 'get',
    })
}

export function getPositionByGeohash(geohash) {
    return request({
        url: `/api/v2/pois/${geohash}`,
        method: 'get',
    })
}

export function getRestaurants(params) {
    return request({
        url: `/api/shopping/restaurants`,
        method: 'get',
        params
    })
}