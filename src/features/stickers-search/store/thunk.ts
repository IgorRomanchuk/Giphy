import { createAsyncThunk } from '@reduxjs/toolkit'
import { StickersApi } from '@shared/api/stickers.api'
import { ImageSchema } from '@shared/models/image.model'

export const fetchStickersBySearchValue = createAsyncThunk<
  ImageSchema[],
  { offset: number; searchValue: string | undefined },
  { rejectValue: string }
>(
  'images/fetchStickersBySearchValue',
  async function ({ offset, searchValue }, { rejectWithValue }) {
    try {
      return await StickersApi.getStickersByValue({
        q: searchValue,
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
