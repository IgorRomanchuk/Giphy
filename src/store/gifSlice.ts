import { createSlice } from '@reduxjs/toolkit'

import { Gif as GifType } from '../types/Gif'

interface Gif {
  gif: null | GifType
}

const initialState: Gif = {
  gif: null,
}

const gifsSlice = createSlice({
  name: 'gif',
  initialState,
  reducers: {
    setGif: (state, action) => {
      state.gif = action.payload
    },
  },
})

export const { setGif } = gifsSlice.actions

export default gifsSlice.reducer
