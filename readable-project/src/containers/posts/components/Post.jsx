import React from 'react'
import { object, func } from 'prop-types'
import { Card, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Rating from '../../components/Rating'

class Post extends React.Component {
  
  handleVote = (voteOption) => {
    const { post, onVote } = this.props
    onVote(post.id, voteOption)
  }

  render () {
    const { post } = this.props
    return (
      <Card>
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>{post.author}</Card.Meta>
          <Card.Description>{post.body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label as={Link} color='blue' to={`/posts/${post.id}`}>
            <Icon name='comments' /> {post.commentCount}
          </Label>
          <Label><Icon name='tags' />{post.category}</Label>
          <div style={{padding: '2px'}}>
            <Rating score={post.voteScore || 0} onVote={this.handleVote} />
          </div>
        </Card.Content>
      </Card>
    )
  }
}

Post.propTypes = {
  post: object.isRequired,
  onVote: func.isRequired
}

export default Post
