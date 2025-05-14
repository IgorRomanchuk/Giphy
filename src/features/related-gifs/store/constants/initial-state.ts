import { InitialState } from '@features/related-gifs/store/models/initial-state.model'

export const initialState: InitialState = {
  relatedGifs: [],
  offset: 0,
  isLoading: false,
  error: null,
}
