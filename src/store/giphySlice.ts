import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: any = {
  giphys: [],
  status: null,
  error: null,
}

export const fetchGiphys = createAsyncThunk<
  any,
  undefined,
  { rejectValue: string }
>('giphys/fetchGiphy', async function (_, { rejectWithValue }) {
  return axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=D6pzE2XH042RPjHU9yvpjm7aoJgYcJsR&q=manutd&limit=5`,
    )
    .then((res) => res.data.data)
    .catch((err) => rejectWithValue(err.message))
})

const giphyssSlice = createSlice({
  name: 'giphys',
  initialState,
  reducers: {
    addGiphys(state, action) {
      state.giphys = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiphys.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchGiphys.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.giphys = action.payload
      })
      .addCase(fetchGiphys.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload as string
      })
  },
})

export const { addGiphys } = giphyssSlice.actions

export default giphyssSlice.reducer
