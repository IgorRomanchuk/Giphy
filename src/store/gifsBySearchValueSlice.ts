import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_KEY } from '../constants'
import { Gif } from '../types/Gif'

interface gifsBySearchValueState {
  gifsBySearchValue: Gif[]
  offset: number
  isLoading: boolean
  error: null | string
  value: string
  pagination: { total_count: number; count: number; offset: number } | null
}

const initialState: gifsBySearchValueState = {
  gifsBySearchValue: [],
  offset: 0,
  isLoading: false,
  error: null,
  value: '',
  pagination: null,
}

export const fetchGifsBySearchValue = createAsyncThunk<
  any,
  { offset: number; searchValue: string | undefined },
  { rejectValue: string }
>(
  'gifs/fetchGifsBySearchValue',
  async function ({ offset, searchValue }, { rejectWithValue }) {
    return await axios
      .get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: API_KEY,
          q: searchValue,
          limit: 12,
          offset: offset,
        },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.message))
  },
)

const gifsBySearchValueSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload || ''
    },
    resetGifs: (state) => {
      state.gifsBySearchValue = []
      state.offset = state.offset - 12
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
        state.pagination = action.payload.pagination
        state.gifsBySearchValue.push(...action.payload.data)
      })
      .addCase(fetchGifsBySearchValue.rejected, (state, action) => {
        state.isLoading = false
        state.pagination = null
        state.error = action.payload as string
      })
  },
})

export const { setValue, resetGifs } = gifsBySearchValueSlice.actions

export default gifsBySearchValueSlice.reducer
