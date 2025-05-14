import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

export const fetchGif = createAsyncThunk<
  GifSchema,
  string,
  { rejectValue: string }
>('gif/fetchGif', async function (id, { rejectWithValue }) {
  try {
    return await GifsApi.getGifById(id)
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Failed to fetch gifs',
    )
  }
})
