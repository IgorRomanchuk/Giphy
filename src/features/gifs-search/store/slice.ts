import { initialState } from '@features/gifs-search/store/constants/initial-state'
import { fetchGifsBySearchValue } from '@features/gifs-search/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const gifsBySearchValueSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    resetSearchGifs: (state) => {
      state.gifsBySearchValue = []
      state.offset = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifsBySearchValue.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGifsBySearchValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 12
        state.gifsBySearchValue.push(...action.payload)
      })
      .addCase(fetchGifsBySearchValue.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { resetSearchGifs } = gifsBySearchValueSlice.actions

export default gifsBySearchValueSlice.reducer
