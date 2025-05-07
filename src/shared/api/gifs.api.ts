import { api } from '@shared/api'
import { BASE_URL } from '@shared/constants/baseUrl'
import { GifSchema } from '@shared/models/gif.model'
import { ParamsDto } from '@shared/models/params.dto'

export const GifsApi = {
  getTrendingGifs: async (params: Partial<ParamsDto>): Promise<GifSchema[]> =>
    (
      await api.get(`/gifs/trending`, {
        params,
      })
    ).data.data,
  getGifsByValue: async (params: Partial<ParamsDto>): Promise<GifSchema[]> =>
    (
      await api.get(`/gifs/search`, {
        params,
      })
    ).data.data,
  getGifById: async (gifId: string): Promise<GifSchema> =>
    (await api.get(`/gifs/${gifId}`)).data.data,
}
