import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_KEY } from '../constants'
import { Gif } from '../types/Gif'

interface gifsBySearchValueState {
  gifsBySearchValue: Gif[]
  offset: number
  isLoading: boolean
  error: null | string
}

const initialState: gifsBySearchValueState = {
  gifsBySearchValue: [],
  offset: 0,
  isLoading: false,
  error: null,
}

export const fetchGifsBySearchValue = createAsyncThunk<
  Gif[],
  { offset: number; searchValue: string },
  { rejectValue: string }
>(
  'gifs/fetchGifsBySearchValue',
  async function ({ offset, searchValue }, { rejectWithValue }) {
    return await axios
      .get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: API_KEY,
          q: searchValue,
          limit: 10,
          offset: offset,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => rejectWithValue(err.message))
  },
)

const gifsBySearchValueSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifsBySearchValue.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGifsBySearchValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 10
        state.gifsBySearchValue.push(...action.payload)
      })
      .addCase(fetchGifsBySearchValue.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default gifsBySearchValueSlice.reducer
