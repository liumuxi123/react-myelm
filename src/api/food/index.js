import request from "@utils/request.js";

export function getRestaurantCategorys (params) {
  return request({
    url: `/api/shopping/v2/restaurant/category`,
    method: 'get',
    params
  })
}