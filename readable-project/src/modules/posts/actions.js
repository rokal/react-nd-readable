import {initialize} from 'redux-form'

import config from './config';
import {getService} from '../services/index'
import {createAction} from '../redux-utils';

const prefix = config.moduleName.toUpperCase();

export const Actions = createAction([
  'FETCH_ALL',
  'SET_ENTITIES',
  'UPDATE_POST',
  'SET_CURRENT_ENTITY',
  'ADD_POST'
], prefix);

const postService = getService('posts')
const ActionCreators = {
  fetchAll: (callback) => (dispatch) => {
    postService.get().then(data => {
      dispatch(ActionCreators.setEntities(data))
    })
  },

  setEntities: (entities) => ({type: Actions.SET_ENTITIES, entities}),

  votePost: (postId, voteOption, callback=null) => dispatch => {
    postService.vote(postId, voteOption).then((post) => {
      dispatch(ActionCreators.updatePost(postId, post))
      if(callback){
        callback(post)
      }
    })
  },
  updatePost: (postId, post) => ({type: Actions.UPDATE_POST, postId, post}),

  getCurrentEntity: (postId, callback) => dispatch => {
    postService.get(postId).then(post => {
      if(callback) {
        callback(post)
      }
      dispatch(ActionCreators.setCurrentEntity(post))
    })
  },

  createPost: (post, callback) => dispatch => {
    postService.createPost(post).then(newPost => {
      if(callback) {
        callback(post)
      }
      dispatch(ActionCreators.addPost(newPost))
    })
  },

  addPost: (post) => ({type: Actions.ADD_POST, post}),

  setCurrentEntity: (post) => ({type: Actions.SET_CURRENT_ENTITY, post}),
  setEditedEntity: (post) => initialize(config.moduleName, post)
};
export default ActionCreators
