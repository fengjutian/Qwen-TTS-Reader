import axios from 'axios';
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';
// import { message } from 'ant-design-vue';
​
export const http =  axios.create({
    // 本地请求服务端
    baseURL: 'http://127.0.0.1:8001/api/v1/',
    timeout: 10000,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    adapter: axiosTauriApiAdapter,
});
​
// 添加请求拦截器
http.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
​
// 添加响应拦截器
http.interceptors.response.use(
    (response) => {
        // 2xx 范围内的状态码都会触发该函数
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            return Promise.reject(response.data);
        } else {
            // message.warning('网络连接异常,请稍后再试!');
        }
    }
);
​
export function request<T>(data: any): Promise<T> {
    return new Promise((resolve, reject) => {
        const promise = http(data);
        //处理返回
        promise
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}