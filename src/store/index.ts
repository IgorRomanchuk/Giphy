import { configureStore } from '@reduxjs/toolkit'

import giphySlice from './giphySlice'

const store = configureStore({
  reducer: {
    giphys: giphySlice,
  },
})

export default store
