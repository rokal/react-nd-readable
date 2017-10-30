import { Actions } from './actions'
import config from './config'
import { keyBy } from 'lodash'

const initialState = {
  byId: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ENTITIES:
      return { ...state, byId: keyBy(action.entities, entity => entity.id) };
    case Actions.UPDATE_POST:
      const allPosts = {...state.byId}
      allPosts[action.postId] = action.post
      return { ...state, byId: allPosts}
    default:
      return state;
  }
}

export default {
  [config.storeBranch]: reducer
}
