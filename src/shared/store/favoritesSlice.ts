import { createSlice } from '@reduxjs/toolkit'
import { GifSchema } from '@shared/models/gif.model'

interface Favorites {
  favorites: GifSchema[]
}

const initialState: Favorites = {
  favorites: JSON.parse(localStorage.getItem('favoritesGifs') || '[]') || [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteGif: (state, action) => {
      state.favorites.push(action.payload)
      localStorage.setItem('favoritesGifs', JSON.stringify(state.favorites))
    },
    deleteFavoriteGif: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id,
      )
      localStorage.setItem('favoritesGifs', JSON.stringify(state.favorites))
    },
  },
})

export const { setFavoriteGif, deleteFavoriteGif } = favoritesSlice.actions

export default favoritesSlice.reducer
