import { API_KEY } from '@shared/constants/apiKey'
import { BASE_URL } from '@shared/constants/baseUrl'
import axios from 'axios'

export const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      limit: 12,
      ...config.params,
      api_key: API_KEY,
    },
  }
})
