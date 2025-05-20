import { initialState } from '@features/trending-stickers/store/constants/initial-state'
import { fetchTrendingStickers } from '@features/trending-stickers/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const trendingStickersSlice = createSlice({
  name: 'trendingGifs',
  initialState,
  reducers: {
    resetTrendingStickers: (state) => {
      state.trendingStickers = []
      state.offset = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingStickers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrendingStickers.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 12
        state.trendingStickers.push(...action.payload)
      })
      .addCase(fetchTrendingStickers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { resetTrendingStickers } = trendingStickersSlice.actions

export default trendingStickersSlice.reducer
