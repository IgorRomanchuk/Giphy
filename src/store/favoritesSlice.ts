import { createSlice } from '@reduxjs/toolkit'

import { Gif } from '../types/Gif'

interface Favorites {
  favorites: Gif[]
}

const initialState: Favorites = {
  favorites: JSON.parse(localStorage.getItem('favoritesGifs') || '[]') || [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setGif: (state, action) => {
      state.favorites.push(action.payload)
    },
  },
})

export const { setGif } = favoritesSlice.actions

export default favoritesSlice.reducer
