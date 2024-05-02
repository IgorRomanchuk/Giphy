import { configureStore } from '@reduxjs/toolkit'

import gifsBySearchValueSlice from './gifsBySearchValueSlice'
import giphySlice from './gifsSlice'

const store = configureStore({
  reducer: {
    gifs: giphySlice,
    gifsBySearchValue: gifsBySearchValueSlice,
  },
})

export default store
