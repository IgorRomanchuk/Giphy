import { initialState } from '@features/related-images/store/constants/initial-state'
import { fetchRelatedImages } from '@features/related-images/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const relatedImagesSlice = createSlice({
  name: 'relatedImages',
  initialState,
  reducers: {
    resetRelatedImages: (state) => {
      state.relatedImages = []
      state.offset = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedImages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRelatedImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 12
        state.relatedImages.push(...action.payload)
      })
      .addCase(fetchRelatedImages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { resetRelatedImages } = relatedImagesSlice.actions

export default relatedImagesSlice.reducer
