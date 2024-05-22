import { configureStore } from '@reduxjs/toolkit'

import articlesSliceReducer from './articlesSlice'
import articleSliceReduser from './articleSlice'
import userSliceReducer from './userSlice'

export default configureStore({
  reducer: {
    articles: articlesSliceReducer,
    article: articleSliceReduser,
    user: userSliceReducer,
  },
})
