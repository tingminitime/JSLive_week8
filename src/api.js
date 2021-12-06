// ----- Module -----
import { blockLoading, fixedLoading } from './loading.js'

// ----- API base -----
const token = 'PXrRfppPR2Uht0dID8L1bdukHMa2'
const path = 'timinitime'

const apiRequest = axios.create({
  baseURL: 'https://livejs-api.hexschool.io/api/livejs/v1'
})

const apiRequestWithToken = axios.create({
  baseURL: 'https://livejs-api.hexschool.io/api/livejs/v1',
  headers: {
    'authorization': token
  }
})

// -----  -----
export const CLI_apiRequest = () => {
  // 取得全部產品
  const GET_products = () => apiRequest.get(`/customer/${path}/products`)
  // 取得購物車資訊
  const GET_carts = () => apiRequest.get(`/customer/${path}/carts`)
  // 新增產品至購物車
  const POST_carts = data => apiRequest.post(`/customer/${path}/carts`, data)
  // 修改購物車產品數量
  const PATCH_carts = data => apiRequest.patch(`/customer/${path}/carts`, data)

  return { GET_products, GET_carts, POST_carts, PATCH_carts }
}

// -----  -----
apiRequest.interceptors.request.use(
  (config) => {
    let url = config.url.split('/')
    url.shift()

    if (config.method === 'get' || config.method === 'post') {
      blockLoading(url[url.length - 1])
    }
    else if (config.method === 'patch' || config.method === 'delete') {
      fixedLoading()
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

apiRequest.interceptors.response.use(
  (res) => {
    if (res.config.method === 'patch' || res.config.method === 'delete') {
      fixedLoading()
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)