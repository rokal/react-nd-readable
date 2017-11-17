import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import postsReducers from './posts/reducer'
import categoriesReducers from './categories/reducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  ...postsReducers,
  ...categoriesReducers,
  form: formReducer,
  toastr: toastrReducer
})

export default rootReducer
