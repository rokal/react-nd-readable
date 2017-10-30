import config from './config';
import {getService} from '../services/index'
import {createAction} from '../redux-utils';

const prefix = config.moduleName.toUpperCase();

export const Actions = createAction([
  'FETCH_ALL',
  'SET_ENTITIES',
  'UPDATE_POST'
], prefix);

const postService = getService('posts')
const ActionCreators = {
  fetchAll: (callback) => (dispatch) => {
    postService.get().then(data => {
      dispatch(ActionCreators.setEntities(data))
    })
  },

  setEntities: (entities) => ({type: Actions.SET_ENTITIES, entities}),

  votePost: (postId, voteOption) => dispatch => {
    postService.vote(postId, voteOption).then((post) => {
      dispatch(ActionCreators.updatePost(postId, post))
    })
  },
  updatePost: (postId, post) => ({type: Actions.UPDATE_POST, postId, post})
};
export default ActionCreators
