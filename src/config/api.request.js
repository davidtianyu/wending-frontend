import HttpRequest from '@/config/axios'
import config from '@/config/index'

const axios = new HttpRequest(config.baseUrl)
export default axios