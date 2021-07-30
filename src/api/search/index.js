import request from "@utils/request.js";

export function getSearchCategory(params) {
  return request({
    url: `/api/v4/restaurants`,
    method: "get",
    params,
  });
}
