import axios from 'axios'


// Path: 127.0.0.1:8000/app_apis  这是使用Django搭建的后台服务器
const DynamicUtils = axios.create({
    baseURL: 'http://192.168.0.14:8000/apis/dynamic/',
    // baseURL: 'https://www.xinyipurification.com/apis/dynamic/',
    timeout: 5000,
})

DynamicUtils.interceptors.request.use(config => config, err => Promise.reject(err))
DynamicUtils.interceptors.response.use(res => res.data, err => Promise.reject(err))

export default DynamicUtils