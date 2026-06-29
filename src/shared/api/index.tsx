import { environment } from '@shared/constants/enviroment'
import axios from 'axios'

export const api = axios.create({
  baseURL: environment.baseURL,
})

api.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: environment.apiKey,
    },
  }
})
