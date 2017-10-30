import { Actions } from './actions'
import config from './config'

const initialState = {
  all: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SAVE_CATEGORIES:
      const categories = action.categories
      return { ...state, all: categories};
    default:
      return state;
  }
}

export default {
  [config.storeBranch]: reducer
}
