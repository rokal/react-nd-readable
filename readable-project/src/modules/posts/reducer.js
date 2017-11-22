import { Actions } from './actions'
import config from './config'
import { keyBy } from 'lodash'
import {CREATE_OPERATION} from './operations'

const initialState = {
  byId: {}, currentEntity: {}, showEditPostModal: false, operation:CREATE_OPERATION
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
    case Actions.REMOVE_POST:
      const thePosts = {...state.byId}
      delete thePosts[action.postId]
      return { ...state, byId: thePosts}
    case Actions.SHOW_MODAL:
      return {...state, showEditPostModal: true, operation: action.operation}
    case Actions.HIDE_MODAL:
      return {...state, showEditPostModal: false}
    default:
      return state;
  }
}

export default {
  [config.storeBranch]: reducer
}
