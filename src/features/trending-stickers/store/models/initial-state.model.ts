import { GifSchema } from '@shared/models/gif.model'

export interface InitialState {
  trendingStickers: GifSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}
