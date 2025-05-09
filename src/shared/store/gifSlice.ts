import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

interface Gif {
  gif: null | GifSchema
  isLoading: boolean
  error: null | string
}

const initialState: Gif = {
  gif: null,
  isLoading: false,
  error: null,
}

export const fetchGif = createAsyncThunk<
  GifSchema,
  string,
  { rejectValue: string }
>('gif/fetchGif', async function (id, { rejectWithValue }) {
  try {
    return await GifsApi.getGifById(id)
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Failed to fetch trending-gifs',
    )
  }
})

const gifsSlice = createSlice({
  name: 'gif',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGif.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGif.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.gif = action.payload
      })
      .addCase(fetchGif.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default gifsSlice.reducer
