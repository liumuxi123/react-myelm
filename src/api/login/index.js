import request from "@utils/request.js";
/** 更新验证码 */
export function updateCaptchas () {
  return request({
    url: `/api/v1/captchas`,
    method: 'post',
  })
}

/** 登陆 */
export function loginFun (data) {
    return request({
      url: `/api/v2/login`,
      method: 'post',
      data
    })
  }
