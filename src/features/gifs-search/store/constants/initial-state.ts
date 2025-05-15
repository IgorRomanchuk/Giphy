import { InitialState } from '@features/gifs-search/store/models/initial-state.model'

export const initialState: InitialState = {
  gifsBySearchValue: [],
  offset: 0,
  isLoading: false,
  error: null,
}
