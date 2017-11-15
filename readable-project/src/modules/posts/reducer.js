import { Actions } from './actions'
import config from './config'
import { keyBy } from 'lodash'

const initialState = {
  byId: {}, currentEntity: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ENTITIES:
      return { ...state, byId: keyBy(action.entities, entity => entity.id) };
    case Actions.UPDATE_POST:
      const allPosts = {...state.byId}
      allPosts[action.postId] = action.post
      return { ...state, byId: allPosts}
    case Actions.SET_CURRENT_ENTITY: 
      return {...state, currentEntity: action.post}
    case Actions.ADD_POST:
      const posts = {...state.byId}
      posts[action.post.id] = action.post
      return { ...state, byId: posts}
    default:
      return state;
  }
}

export default {
  [config.storeBranch]: reducer
}
