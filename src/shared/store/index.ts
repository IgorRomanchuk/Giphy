import { configureStore } from '@reduxjs/toolkit'
import favoritesSlice from '@shared/store/favoritesSlice'
import gifsBySearchValueSlice from '@shared/store/gifsBySearchValueSlice'
import gifSlice from '@shared/store/gifSlice'
import trendingGifsSlice from '@shared/store/gifsSlice'
import relatedGifsSlice from '@shared/store/relatedGifsSlice'

const store = configureStore({
  reducer: {
    trendingGifs: trendingGifsSlice,
    relatedGifs: relatedGifsSlice,
    gifsBySearchValue: gifsBySearchValueSlice,
    favorites: favoritesSlice,
    gif: gifSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
