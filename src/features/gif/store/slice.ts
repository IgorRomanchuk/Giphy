import { initialState } from '@features/gif/store/constants/initial-state'
import { fetchGif } from '@features/gif/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const gifsSlice = createSlice({
  name: 'gif',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGif.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGif.fulfilled, (state, action) => {
        state.error = null
        state.gif = action.payload
        state.isLoading = false
      })
      .addCase(fetchGif.rejected, (state, action) => {
        state.error = action.payload as string
        state.gif = null
        state.isLoading = false
      })
  },
})

export default gifsSlice.reducer
