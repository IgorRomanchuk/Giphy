import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

interface RelatedGifsState {
  relatedGifs: GifSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}

const initialState: RelatedGifsState = {
  relatedGifs: [],
  offset: 0,
  isLoading: false,
  error: null,
}

export const fetchRelatedGifs = createAsyncThunk<
  GifSchema[],
  { offset: number; id: string },
  { rejectValue: string }
>(
  'relatedGifs/fetchRelatedGifs',
  async function ({ offset, id }, { rejectWithValue }) {
    try {
      return await GifsApi.getRelatedGifs({
        offset,
        gif_id: id,
        limit: 12,
      })
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Failed to fetch gifs',
      )
    }
  },
)

const relatedGifsSlice = createSlice({
  name: 'relatedGifs',
  initialState,
  reducers: {
    resetRelatedGifs: (state) => {
      state.relatedGifs = []
      state.offset = state.offset - 12
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
