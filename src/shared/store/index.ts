import { configureStore } from '@reduxjs/toolkit'

import favoritesSlice from './favoritesSlice'
import gifsBySearchValueSlice from './gifsBySearchValueSlice'
import gifSlice from './gifSlice'
import trendingGifsSlice from './gifsSlice'

const store = configureStore({
  reducer: {
    trendingGifs: trendingGifsSlice,
    gifsBySearchValue: gifsBySearchValueSlice,
    favorites: favoritesSlice,
    gif: gifSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
