import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

interface TrendingGifsState {
  trendingGifs: GifSchema[]
  offset: number
  isLoading: boolean
  error: null | string
}

const initialState: TrendingGifsState = {
  trendingGifs: [],
  offset: 0,
  isLoading: false,
  error: null,
}

export const fetchTrendingGifs = createAsyncThunk<
  GifSchema[],
  number,
  { rejectValue: string }
>(
  'trendingGifs/fetchTrendingGifs',
  async function (offset, { rejectWithValue }) {
    try {
      return await GifsApi.getTrendingGifs({
        offset,
        limit: 12,
      })
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Failed to fetch trending-gifs',
      )
    }
  },
)

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
