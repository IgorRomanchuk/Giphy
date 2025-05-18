import { api } from '@shared/api'
import { GifSchema } from '@shared/models/gif.model'
import { ParamsDto } from '@shared/models/params.dto'

export const StickersApi = {
  getTrendingStickers: async (
    params: Partial<ParamsDto>,
  ): Promise<GifSchema[]> =>
    (
      await api.get(`/stickers/trending`, {
        params,
      })
    ).data.data,

  getStickersByValue: async (
    params: Partial<ParamsDto>,
  ): Promise<GifSchema[]> =>
    (
      await api.get(`/stickers/search`, {
        params,
      })
    ).data.data,

  getStickerById: async (gifId: string): Promise<GifSchema> =>
    (await api.get(`/stickers/${gifId}`)).data.data,

  getRelatedStickers: async (
    params: Partial<ParamsDto>,
  ): Promise<GifSchema[]> =>
    (await api.get(`/stickers/related`, { params })).data.data,
}
