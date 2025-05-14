import { createAsyncThunk } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

export const fetchGifsBySearchValue = createAsyncThunk<
  GifSchema[],
  { offset: number; searchValue: string | undefined },
  { rejectValue: string }
>(
  'gifs/fetchGifsBySearchValue',
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
