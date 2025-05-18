import { createAsyncThunk } from '@reduxjs/toolkit'
import { StickersApi } from '@shared/api/stickers.api'
import { GifSchema } from '@shared/models/gif.model'

export const fetchTrendingStickers = createAsyncThunk<
  GifSchema[],
  number,
  { rejectValue: string }
>(
  'trendingStickers/fetchTrendingStickers',
  async function (offset, { rejectWithValue }) {
    try {
      return await StickersApi.getTrendingStickers({
        offset,
        limit: 12,
      })
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Failed to fetch stickers',
      )
    }
  },
)
