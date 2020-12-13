import axios from 'axios'
import { message } from 'ant-design-vue'
export default axios.create({
    baseURL: process.server ? process.env.apiHost : '/api/',
})