import { Actions } from './actions'
import config from './config'
import { keyBy } from 'lodash'

const initialState = {
  byId: {}, currentEntity: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_COMMENTS:
      const byId = keyBy(action.comments, comment => comment.id)
      return { ...state, byId};
    case Actions.UPDATE_COMMENT:
      const allPosts = {...state.byId}
      allPosts[action.commentId] = action.comment
      return { ...state, byId: allPosts}
    case Actions.ADD_COMMENT:
      const comments = {...state.byId}
      comments[action.comment.id] = action.comment
      return { ...state, byId: comments}
    default:
      return state;
  }
}

export default {
  [config.storeBranch]: reducer
}
