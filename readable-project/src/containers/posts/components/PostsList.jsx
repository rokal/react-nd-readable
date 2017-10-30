import React from 'react'
import { array, func } from 'prop-types'
import { Card, Header, Icon, Label } from 'semantic-ui-react'

import Post from './Post'

class PostList extends React.Component {
  render () {
    const { posts, onVote } = this.props
    return (
      <div>
        <Header>
          <span>
            <Icon name='list layout' />
          </span>
          <span>
            List of the posts
          <Label>
              <span>Total: </span>
              <Label.Detail>{posts.length}</Label.Detail>
            </Label>
          </span>

        </Header>
        <Card.Group>
          {posts.map((post, index) => {
            return (
              <Post key={index} post={post} onVote={onVote} />
            )
          })}
        </Card.Group>
      </div>
    )
  }
}

PostList.propTypes = {
  posts: array.isRequired,
  onVote: func.isRequired
}

export default PostList
