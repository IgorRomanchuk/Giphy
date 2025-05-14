import { GifSchema } from '@shared/models/gif.model'

export interface InitialState {
  trendingGifs: GifSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}
