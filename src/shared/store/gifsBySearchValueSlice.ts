import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GifsApi } from '@shared/api/gifs.api'
import { GifSchema } from '@shared/models/gif.model'

interface gifsBySearchValueState {
  gifsBySearchValue: GifSchema[]
  offset: number
  isLoading: boolean
  error: null | string
  value: string
}

const initialState: gifsBySearchValueState = {
  gifsBySearchValue: [],
  offset: 0,
  isLoading: false,
  error: null,
  value: '',
}

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

const gifsBySearchValueSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload || ''
    },
    resetGifs: (state) => {
      state.gifsBySearchValue = []
      state.offset = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifsBySearchValue.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGifsBySearchValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.offset = state.offset + 12
        state.gifsBySearchValue.push(...action.payload)
      })
      .addCase(fetchGifsBySearchValue.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setValue, resetGifs } = gifsBySearchValueSlice.actions

export default gifsBySearchValueSlice.reducer
