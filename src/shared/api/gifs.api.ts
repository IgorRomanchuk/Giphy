import { API_KEY } from '@shared/constants/apiKey'
import axios from 'axios'

export const GifsApi = {
  getTrendingGifs: async (offset: number) => {
    return (
      await axios.get(`https://api.giphy.com/v1/gifs/trending`, {
        params: {
          api_key: API_KEY,
          limit: 12,
          offset,
        },
      })
    ).data
  },
}
