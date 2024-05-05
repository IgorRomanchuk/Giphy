import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_KEY } from '../constants'
import { Gif } from '../types/Gif'

interface TrendingGifsState {
  trendingGifs: Gif[]
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
  Gif[],
  number,
  { rejectValue: string }
>(
  'trendingGifs/fetchTrendingGifs',
  async function (offset, { rejectWithValue }) {
    return await axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10&offset=${offset}`,
      )
      .then((res) => res.data.data)
      .catch((err) => rejectWithValue(err.message))
  },
)

const trendingGifsSlice = createSlice({
  name: 'trendingGifs',
  initialState,
  reducers: {
    resetTrendingGifs: (state) => {
      state.trendingGifs = []
      state.offset = state.offset - 10
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
        state.offset = state.offset + 10
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
