import axios from "axios";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 15000
});

// request拦截器
service.interceptors.request.use(
    config => {
      // Do something before request is sent
      if (config.showloading) {
        // isLoad = config.showloading;
        // start();
      }
    //   if (store.getters.token) {
    //     config.headers.t = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    //   }
      return config;
    },
    error => {
      // Do something with request error
      Promise.reject(error);
    }
  );
  // 响应拦截器
  service.interceptors.response.use(
    response => {
      /**
       * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
       * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
       */
    //   if (isLoad) {
    //     end();
    //   }
      return response.data;
    //   if (response.status >= 200 && response.status <= 299) {
    //     return response.data;
    //   }
    },
    error => {
    //   if (isLoad) {
    //     end();
    //   }
      Promise.reject(error);
    }
  );
  export default service;