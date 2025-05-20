import { api } from '@shared/api'
import { ImageSchema } from '@shared/models/image.model'
import { ParamsDto } from '@shared/models/params.dto'

export const GifsApi = {
  getTrendingGifs: async (params: Partial<ParamsDto>): Promise<ImageSchema[]> =>
    (
      await api.get(`/gifs/trending`, {
        params,
      })
    ).data.data,

  getGifsByValue: async (params: Partial<ParamsDto>): Promise<ImageSchema[]> =>
    (
      await api.get(`/gifs/search`, {
        params,
      })
    ).data.data,

  getGifById: async (gifId: string): Promise<ImageSchema> =>
    (await api.get(`/gifs/${gifId}`)).data.data,

  getRelatedGifs: async (params: Partial<ParamsDto>): Promise<ImageSchema[]> =>
    (await api.get(`/gifs/related`, { params })).data.data,
}
