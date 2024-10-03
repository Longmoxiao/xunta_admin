//工具类封装
import axios from "axios";
// import config from "../devConfig";//配置文件的引入

//如果是开发环境就拿到dev,否则就是生成环境
const baseUrl='http://47.121.203.18:8080'


class HttpRequest {
    constructor(baseUrl) {
          this.baseUrl = baseUrl;
    }
    getInsideConfig() { // 定义axios的相关配置
          const config = {
              baseURL: this.baseUrl, // 使用 baseURL 而不是 baseUrl
              headers: {
                'Content-Type': 'application/json' // 默认请求头为 JSON
              } // 请求头的信息
          };
          return config;
    }
    // 拦截器相关函数
    interceptors(instance) {
          // 添加请求拦截器
          instance.interceptors.request.use(function (config) {
              // 在发送请求之前做些什么
              return config;
          }, function (error) {
              // 对请求错误做些什么
              return Promise.reject(error);
          });

          // 添加响应拦截器
          instance.interceptors.response.use(function (response) {
              // 对响应数据做点什么
              return response;
          }, function (error) {
              // 对响应错误做点什么
              return Promise.reject(error);
          });
    }
    // 后续接口请求调用,接收一个传入的相关配置
    request(options) {
           const instance = axios.create();
           options = { ...this.getInsideConfig(), ...options };
           this.interceptors(instance);
           return instance(options);
    }
}

export default new HttpRequest(baseUrl);
