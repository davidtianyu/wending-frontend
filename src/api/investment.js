import axios from '@/config/api.request'

export default {
  // 查询投资资产
  getInvestments (address) {
    return axios.request({
      url: '/investment/assets',
      method: 'get',
      params: {
        "address": address
      }
    })
  },
}