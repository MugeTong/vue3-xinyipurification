import axios from 'axios'

// Path: 127.0.0.1:8000/app_apis  这是使用Django搭建的后台服务器
const StaticUtils = axios.create({
    baseURL: 'http://192.168.0.14:8000/apis/static/',
    // baseURL: 'https://www.xinyipurification.com/apis/static/',
    timeout: 5000,
})
StaticUtils.interceptors.request.use(config => config, err => Promise.reject(err))
StaticUtils.interceptors.response.use(res => res.data, err => Promise.reject(err))

export default StaticUtils
