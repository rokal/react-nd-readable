import React from 'react'
import { object, func } from 'prop-types'
import { Comment, Label } from 'semantic-ui-react'
import TimeAgo from 'react-timeago'
import userIco from './user.png'

import Rating from '../commons/Rating'

class CustomComment extends React.Component {

  handleVote = (voteOption) => {
    const { comment, onVote } = this.props
    onVote(comment.id, voteOption)
  }

  handleDeleteComment = () => {
    const { onDeleteComment, comment } = this.props
    onDeleteComment(comment.id)
  }

  render () {
    const { comment } = this.props
    return (
      <Comment.Group>
        <Comment>
          <Comment.Avatar as='a' src={userIco} />
          <Comment.Content>
            <Comment.Author as='a'>{comment.author}</Comment.Author>
            <Comment.Metadata>
              <TimeAgo minPeriod={60} date={comment.timestamp} />
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
            <Comment.Actions>
              <div style={{ padding: '2px' }}>
                <Rating score={comment.voteScore || 0} onVote={this.handleVote} />
                <Label style={{ cursor: 'pointer' }} color='red' title='delete' onClick={this.handleDeleteComment}>X</Label>
              </div>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    )
  }
}

CustomComment.propTypes = {
  comment: object.isRequired,
  onVote: func.isRequired,
  onDeleteComment: func.isRequired
}

export default CustomComment
