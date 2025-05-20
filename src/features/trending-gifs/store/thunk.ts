import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { ImageSchema } from '@shared/models/image.model'

export const fetchTrendingGifs = createAsyncThunk<
  ImageSchema[],
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
        err instanceof Error ? err.message : 'Failed to fetch gifs',
      )
    }
  },
)
