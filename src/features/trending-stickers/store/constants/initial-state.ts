import { InitialState } from '@features/trending-stickers/store/models/initial-state.model'

export const initialState: InitialState = {
  trendingStickers: [],
  offset: 0,
  isLoading: false,
  error: null,
}
