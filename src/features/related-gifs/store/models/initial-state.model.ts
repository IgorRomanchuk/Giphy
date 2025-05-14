import { GifSchema } from '@shared/models/gif.model'

export interface InitialState {
  relatedGifs: GifSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}
