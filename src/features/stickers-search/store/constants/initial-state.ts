import { InitialState } from '@features/stickers-search/store/models/initial-state.model'

export const initialState: InitialState = {
  stickersBySearchValue: [],
  offset: 0,
  isLoading: false,
  error: null,
}
