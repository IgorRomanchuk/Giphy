import { ImageSchema } from '@shared/models/image.model'

export interface InitialState {
  relatedImages: ImageSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}
