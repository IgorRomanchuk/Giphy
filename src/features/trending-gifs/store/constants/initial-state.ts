import { InitialState } from '@features/trending-gifs/store/models/initial-state.model'

export const initialState: InitialState = {
  trendingGifs: [],
  offset: 0,
  isLoading: false,
  error: null,
}
