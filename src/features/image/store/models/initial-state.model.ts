import { ImageSchema } from '@shared/models/image.model'

export interface InitialState {
  image: null | ImageSchema
  isLoading: boolean
  error: null | string
}
