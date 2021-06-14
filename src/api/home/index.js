import request from "@utils/request.js";

export function getCitys (params) {
  return request({
    url: `/api/v1/cities`,
    method: 'get',
    params
  })
}