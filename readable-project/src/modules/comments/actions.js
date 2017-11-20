import {initialize} from 'redux-form'
import {uuid} from 'lodash-uuid'

import config from './config';
import {getService} from '../services/index'
import {createAction} from '../redux-utils';

const prefix = config.moduleName.toUpperCase();

export const Actions = createAction([
  'SET_COMMENTS',
  'UPDATE_COMMENT',
  'ADD_COMMENT'
], prefix);

const commentService = getService('comments')
const ActionCreators = {
  fetchPostComments: (postId, callback) => (dispatch) => {
    commentService.getPostComments(postId).then(data => {
      dispatch(ActionCreators.setComments(data))
    }, error => {
      console.log(error)
    })
  },

  setComments: (comments) => ({type: Actions.SET_COMMENTS, comments}),

  voteComment: (commentId, voteOption, callback=null) => dispatch => {
    commentService.vote(commentId, voteOption).then((comment) => {
      dispatch(ActionCreators.updateComment(commentId, comment))
      if(callback){
        callback(comment)
      }
    })
  },
  updateComment: (commentId, comment) => ({type: Actions.UPDATE_COMMENT, commentId, comment}),

  createComment: (comment, callback) => dispatch => {
    commentService.createComment(comment).then(newComment => {
      if(callback) {
        callback(newComment)
      }
      dispatch(ActionCreators.initializeCommentForm(comment.parentId))
      dispatch(ActionCreators.addComment(newComment))
    })
  },

  addComment: (comment) => ({type: Actions.ADD_COMMENT, comment}),

  initializeCommentForm: (postId) => initialize(config.commentForm, {parentId: postId, id: uuid()})
};
export default ActionCreators
