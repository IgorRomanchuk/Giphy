import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

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
        err instanceof Error ? err.message : 'Failed to fetch gifs',
      )
    }
  },
)
