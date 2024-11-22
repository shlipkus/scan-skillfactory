import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import usedReducer from './reducers/info'
import limitReducer from './reducers/limit_info'
import sumReducer from './reducers/summary_data'
import idListReducer from './reducers/idList'
import postsReducer from './reducers/posts'

const store = configureStore({
  reducer: {
    auth: authReducer,
    usedInfo: usedReducer,
    limitInfo: limitReducer,
    sumData: sumReducer,
    idList: idListReducer,
    posts: postsReducer
  }
})


export default store