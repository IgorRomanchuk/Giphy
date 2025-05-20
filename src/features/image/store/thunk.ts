import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { ImageSchema } from '@shared/models/image.model'

export const fetchImage = createAsyncThunk<
  ImageSchema,
  string,
  { rejectValue: string }
>('image/fetchImage', async function (id, { rejectWithValue }) {
  try {
    return await GifsApi.getGifById(id)
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Failed to fetch image',
    )
  }
})
