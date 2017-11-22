import React from 'react'
import { object, func } from 'prop-types'
import { Card, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Rating from '../commons/Rating'

class Post extends React.Component {
  
  handleVote = (voteOption) => {
    const { post, onVote } = this.props
    onVote(post.id, voteOption)
  }

  handleDeletePost = () => {
    const { onDeletePost, post } = this.props
    onDeletePost(post.id)
  }

  launchEditModal = () => {
    const {onEdit, post} = this.props
    onEdit(post)
  }

  render () {
    const { post } = this.props
    const creationDate = new Date()
    creationDate.setTime(post.timestamp)
    return (
      <Card>
        <Card.Content>
          <Card.Header><Link to={`${post.category}/${post.id}`}>{post.title}</Link></Card.Header>
          <Card.Meta>{post.author}</Card.Meta>
          <Card.Meta> <Icon name='calendar' /> {creationDate.toUTCString()}</Card.Meta>
          <Card.Description>{post.body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label as={Link} color='blue' to={`/${post.category}/${post.id}`}>
            <Icon name='comments' /> {post.commentCount}
          </Label>
          <Label><Icon name='tags' />{post.category}</Label>
          <Label style={{ cursor: 'pointer' }} color='blue' title='edit' onClick={this.launchEditModal}><Icon name='pencil' /></Label>
          <div style={{padding: '2px'}}>
            <Rating score={post.voteScore || 0} onVote={this.handleVote} />
            <Label style={{ cursor: 'pointer' }} color='red' title='delete' onClick={this.handleDeletePost}>X</Label>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

Post.propTypes = {
  post: object.isRequired,
  onVote: func.isRequired,
  onDeletePost: func.isRequired,
  onEdit: func.isRequired
}

export default Post
