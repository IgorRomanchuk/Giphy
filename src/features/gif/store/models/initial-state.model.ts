import { GifSchema } from '@shared/models/gif.model'

export interface InitialState {
  gif: null | GifSchema
  isLoading: boolean
  error: null | string
}
