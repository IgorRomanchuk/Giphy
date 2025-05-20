import { initialState } from '@features/favorites-images/store/constants/initial-state'
import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteImage: (state, action) => {
      state.favorites.push(action.payload)
      localStorage.setItem('favoritesImages', JSON.stringify(state.favorites))
    },
    deleteFavoriteImage: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id,
      )
      localStorage.setItem('favoritesImages', JSON.stringify(state.favorites))
    },
  },
})

export const { setFavoriteImage, deleteFavoriteImage } = favoritesSlice.actions

export default favoritesSlice.reducer
