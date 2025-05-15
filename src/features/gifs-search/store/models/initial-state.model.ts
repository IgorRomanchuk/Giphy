import { GifSchema } from '@shared/models/gif.model'

export interface InitialState {
  gifsBySearchValue: GifSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}
