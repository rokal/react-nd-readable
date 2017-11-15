import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import postsReducers from './posts/reducer'
import categoriesReducers from './categories/reducer'

const rootReducer = combineReducers({
  ...postsReducers,
  ...categoriesReducers,
  form: formReducer
})

export default rootReducer
