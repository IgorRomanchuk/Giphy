import { configureStore } from '@reduxjs/toolkit'

import gifsBySearchValueSlice from './gifsBySearchValueSlice'
import trendingGifsSlice from './gifsSlice'

const store = configureStore({
  reducer: {
    trendingGifs: trendingGifsSlice,
    gifsBySearchValue: gifsBySearchValueSlice,
  },
})

export default store
