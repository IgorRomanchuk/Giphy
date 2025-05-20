import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { ImageSchema } from '@shared/models/image.model'

export const fetchGifsBySearchValue = createAsyncThunk<
  ImageSchema[],
  { offset: number; searchValue: string | undefined },
  { rejectValue: string }
>(
  'images/fetchGifsBySearchValue',
  async function ({ offset, searchValue }, { rejectWithValue }) {
    try {
      return await GifsApi.getGifsByValue({
        q: searchValue,
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
