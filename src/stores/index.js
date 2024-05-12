import { configureStore } from '@reduxjs/toolkit'

import articlesSliceReducer from './articlesSlice'
import articleSliceReduser from './articleSlice'

export default configureStore({
  reducer: {
    articles: articlesSliceReducer,
    article: articleSliceReduser,
  },
})
