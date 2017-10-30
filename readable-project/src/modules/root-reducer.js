import { combineReducers } from 'redux'
import postsReducers from './posts/reducer'
import categoriesReducers from './categories/reducer'

const rootReducer = combineReducers({
  ...postsReducers,
  ...categoriesReducers
})

export default rootReducer
