import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { ImageSchema } from '@shared/models/image.model'

export const fetchRelatedImages = createAsyncThunk<
  ImageSchema[],
  { offset: number; id: string },
  { rejectValue: string }
>(
  'relatedImages/fetchRelatedImages',
  async function ({ offset, id }, { rejectWithValue }) {
    try {
      return await GifsApi.getRelatedGifs({
        offset,
        gif_id: id,
        limit: 12,
      })
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Failed to fetch images',
      )
    }
  },
)
