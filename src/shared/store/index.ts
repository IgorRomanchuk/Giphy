import favoritesSlice from '@features/favorites-gifs/store/slice'
import gifSlice from '@features/gif/store/slice'
import gifsBySearchValueSlice from '@features/gifs-search/store/slice'
import relatedGifsSlice from '@features/related-gifs/store/slice'
import trendingGifsSlice from '@features/trending-gifs/store/slice'
import trendingStickersSlice from '@features/trending-stickers/store/slice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    trendingGifs: trendingGifsSlice,
    trendingStickers: trendingStickersSlice,
    relatedGifs: relatedGifsSlice,
    gifsBySearchValue: gifsBySearchValueSlice,
    favorites: favoritesSlice,
    gif: gifSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
