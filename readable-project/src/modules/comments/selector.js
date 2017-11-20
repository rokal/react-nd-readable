import {uuid}  from 'lodash-uuid'
import {getFormValues} from 'redux-form'
import config from './config'
import { createSelector } from 'reselect';

const Selector = {}
Selector.getComments = (state) => state[config.storeBranch].byId
Selector.createCommentDraft = (parentId) => ({timestamp: Date.now(), id: uuid(), parentId})
Selector.getEditedComment = getFormValues(config.commentForm)

export const getEditedComment = createSelector(
  [Selector.getEditedComment], (comment) => {
    return comment || {}
  }
)

export default Selector
