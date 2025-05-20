import { ImageSchema } from '@shared/models/image.model'

export interface InitialState {
  stickersBySearchValue: ImageSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}
