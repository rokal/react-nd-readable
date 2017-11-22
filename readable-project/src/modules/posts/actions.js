import {initialize, change} from 'redux-form'

import config from './config';
import {getService} from '../services/index'
import {createAction} from '../redux-utils';

const prefix = config.moduleName.toUpperCase();

export const Actions = createAction([
  'FETCH_ALL',
  'SET_ENTITIES',
  'UPDATE_POST',
  'SET_CURRENT_ENTITY',
  'ADD_POST',
  'REMOVE_POST',
  'SHOW_MODAL',
  'HIDE_MODAL'
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

  getCurrentEntity: (postId, successCallback, errorCallback) => dispatch => {
    postService.get(postId).then(post => {
      if(successCallback) {
        successCallback(post)
      }
      dispatch(ActionCreators.setCurrentEntity(post))
    }, (error)=> {
      console.log(error)
      if(errorCallback){
        errorCallback(error)
      }
    })
  },

  createPost: (post, callback) => dispatch => {
    postService.createPost(post).then(newPost => {
      if(callback) {
        callback(post)
      }
    })
  },

  updateRemotePost: (post, callback) => dispatch => {
    postService.updatePost(post).then(updatedPost => {
      if(callback) {
        callback(updatedPost)
      }
      dispatch(ActionCreators.updatePost(updatedPost.id, updatedPost))
    })
  },

  deletePost: (postId, callback) => dispatch => {
    postService.deletePost(postId).then(() => {
      callback()
    })
  },

  addPost: (post) => ({type: Actions.ADD_POST, post}),
  removePost: (postId) => ({type: Actions.REMOVE_POST, postId}),

  setCurrentEntity: (post) => ({type: Actions.SET_CURRENT_ENTITY, post}),
  setEditedEntity: (post) => initialize(config.moduleName, post),
  initializeFilterForm: () => initialize(config.filterForm, {voteCountOrder: 'desc'}),
  findPostByCategory: (category) => dispatch => {
    if (category) {
      postService.getCategoryPosts(category).then(posts => {
        dispatch(ActionCreators.setEntities(posts))
      })
    }
  },
  changeOrder: (value) => change(config.filterForm, 'order', value),
  removeCategoryFilter: () => change(config.filterForm, 'category', null),

  showEditModal: (operation) => ({type: Actions.SHOW_MODAL, operation}),
  hideEditModal: () => ({type: Actions.HIDE_MODAL})
};
export default ActionCreators
