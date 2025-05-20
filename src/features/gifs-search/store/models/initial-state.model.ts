import { ImageSchema } from '@shared/models/image.model'

export interface InitialState {
  gifsBySearchValue: ImageSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}
