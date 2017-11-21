import React from 'react'
import {array, func} from 'prop-types'
import Comment from './Comment'

class CommentsList extends React.Component {
  render() {
    const {comments, onVoteComment, onDeleteComment} = this.props
    return (
      <div>
        {comments.map(comment => {
          return (
            <Comment key={comment.id} comment={comment} onVote={onVoteComment} onDeleteComment={onDeleteComment} />
          )
        })}
      </div>
    )
  }
}

CommentsList.propTypes = {
  comments: array.isRequired,
  onVoteComment: func.isRequired,
  onDeleteComment: func.isRequired
}

export default CommentsList
