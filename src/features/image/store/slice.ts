import { initialState } from '@features/image/store/constants/initial-state'
import { fetchImage } from '@features/image/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.error = null
        state.image = action.payload
        state.isLoading = false
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.error = action.payload as string
        state.image = null
        state.isLoading = false
      })
  },
})

export default imageSlice.reducer
