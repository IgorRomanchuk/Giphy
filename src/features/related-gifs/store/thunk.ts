import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

export const fetchRelatedGifs = createAsyncThunk<
  GifSchema[],
  { offset: number; id: string },
  { rejectValue: string }
>(
  'relatedGifs/fetchRelatedGifs',
  async function ({ offset, id }, { rejectWithValue }) {
    try {
      return await GifsApi.getRelatedGifs({
        offset,
        gif_id: id,
        limit: 12,
      })
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Failed to fetch trending-gifs',
      )
    }
  },
)
