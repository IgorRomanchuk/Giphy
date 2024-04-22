import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: any = {
  giphys: [],
  offset: 0,
  isLoading: false,
  error: null,
}

export const fetchGiphys = createAsyncThunk<
  any,
  number | undefined,
  { rejectValue: string }
>('giphys/fetchGiphy', async function (offset, { rejectWithValue }) {
  return await axios
    .get(
      `https://api.giphy.com/v1/gifs/trending?api_key=D6pzE2XH042RPjHU9yvpjm7aoJgYcJsR&limit=10&offset=${offset}`,
    )
    .then((res) => res.data.data)
    .catch((err) => rejectWithValue(err.message))
})

const giphyssSlice = createSlice({
  name: 'giphys',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiphys.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGiphys.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 10
        state.giphys.push(...action.payload)
      })
      .addCase(fetchGiphys.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default giphyssSlice.reducer
