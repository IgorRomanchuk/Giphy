import { InitialState } from '@features/related-images/store/models/initial-state.model'

export const initialState: InitialState = {
  relatedImages: [],
  offset: 0,
  isLoading: false,
  error: null,
}
