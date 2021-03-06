import request from "@utils/request.js";

export function getShopDetail(shopid) {
  return request({
    url: `/api/shopping/restaurant/${shopid}`,
    method: "get",
    // params: {
    //   latitude,
    //   longitude: longitude + "&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics",
    // },
  });
}

export function getfoodList(params) {
  return request({
    url: `/api/shopping/v2/menu`,
    method: "get",
    params,
  });
}

export function getRateScores(shopid, params) {
  return request({
    url: `/api/ugc/v2/restaurants/${shopid}/ratings/scores`,
    method: "get",
    params,
  });
}
