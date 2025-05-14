import { initialState } from '@features/trending-gifs/store/constants/initial-state'
import { fetchTrendingGifs } from '@features/trending-gifs/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const trendingGifsSlice = createSlice({
  name: 'trendingGifs',
  initialState,
  reducers: {
    resetTrendingGifs: (state) => {
      state.trendingGifs = []
      state.offset = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingGifs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrendingGifs.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 12
        state.trendingGifs.push(...action.payload)
      })
      .addCase(fetchTrendingGifs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { resetTrendingGifs } = trendingGifsSlice.actions

export default trendingGifsSlice.reducer
