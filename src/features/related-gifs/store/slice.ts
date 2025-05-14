import { initialState } from '@features/related-gifs/store/constants/initial-state'
import { fetchRelatedGifs } from '@features/related-gifs/store/thunk'
import { createSlice } from '@reduxjs/toolkit'

const relatedGifsSlice = createSlice({
  name: 'relatedGifs',
  initialState,
  reducers: {
    resetRelatedGifs: (state) => {
      state.relatedGifs = []
      state.offset = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedGifs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRelatedGifs.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 12
        state.relatedGifs.push(...action.payload)
      })
      .addCase(fetchRelatedGifs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { resetRelatedGifs } = relatedGifsSlice.actions

export default relatedGifsSlice.reducer
