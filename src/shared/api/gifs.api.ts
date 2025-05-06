import { API_KEY } from '@shared/constants/apiKey'
import { BASE_URL } from '@shared/constants/baseUrl'
import { GifSchema } from '@shared/models/gif.model'
import axios from 'axios'

export const GifsApi = {
  getTrendingGifs: async (offset: number): Promise<GifSchema[]> => {
    return (
      await axios.get(`${BASE_URL}/gifs/trending`, {
        params: {
          api_key: API_KEY,
          limit: 12,
          offset,
        },
      })
    ).data.data
  },
  getGifsByValue: async (
    offset: number,
    searchValue?: string,
  ): Promise<GifSchema[]> => {
    return (
      await axios.get(`${BASE_URL}/gifs/search`, {
        params: {
          api_key: API_KEY,
          q: searchValue,
          limit: 12,
          offset,
        },
      })
    ).data.data
  },
  getGifById: async (gifId: string): Promise<GifSchema> => {
    return (
      await axios.get(`${BASE_URL}/gifs/${gifId}`, {
        params: {
          api_key: API_KEY,
        },
      })
    ).data.data
  },
}
