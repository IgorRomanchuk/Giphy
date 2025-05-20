import { initialState } from '@features/stickers-search/store/constants/initial-state'
import { fetchStickersBySearchValue } from '@features/stickers-search/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const stickersBySearchValueSlice = createSlice({
  name: 'stickers',
  initialState,
  reducers: {
    resetSearchStickers: (state) => {
      state.stickersBySearchValue = []
      state.offset = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStickersBySearchValue.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchStickersBySearchValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 12
        state.stickersBySearchValue.push(...action.payload)
      })
      .addCase(fetchStickersBySearchValue.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { resetSearchStickers } = stickersBySearchValueSlice.actions

export default stickersBySearchValueSlice.reducer
