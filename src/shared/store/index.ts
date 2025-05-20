import favoritesSlice from '@features/favorites-images/store/slice'
import gifsBySearchValueSlice from '@features/gifs-search/store/slice'
import imageSlice from '@features/image/store/slice'
import relatedImagesSlice from '@features/related-images/store/slice'
import stickersBySearchValueSlice from '@features/stickers-search/store/slice'
import trendingGifsSlice from '@features/trending-gifs/store/slice'
import trendingStickersSlice from '@features/trending-stickers/store/slice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    trendingGifs: trendingGifsSlice,
    trendingStickers: trendingStickersSlice,
    relatedImages: relatedImagesSlice,
    gifsBySearchValue: gifsBySearchValueSlice,
    stickersBySearchValue: stickersBySearchValueSlice,
    favorites: favoritesSlice,
    image: imageSlice,
  },
})

export default store
