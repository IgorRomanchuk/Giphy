import { api } from '@shared/api'
import { ImageSchema } from '@shared/models/image.model'
import { ParamsDto } from '@shared/models/params.dto'

export const StickersApi = {
  getTrendingStickers: async (
    params: Partial<ParamsDto>,
  ): Promise<ImageSchema[]> =>
    (
      await api.get(`/stickers/trending`, {
        params,
      })
    ).data.data,

  getStickersByValue: async (
    params: Partial<ParamsDto>,
  ): Promise<ImageSchema[]> =>
    (
      await api.get(`/stickers/search`, {
        params,
      })
    ).data.data,
}
