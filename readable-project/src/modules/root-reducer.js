import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import postsReducers from './posts/reducer'
import categoriesReducers from './categories/reducer'
import commentsReducers from './comments/reducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  ...postsReducers,
  ...categoriesReducers,
  ...commentsReducers,
  form: formReducer,
  toastr: toastrReducer
})

export default rootReducer
