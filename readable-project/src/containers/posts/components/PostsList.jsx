import React from 'react'
import { array, func } from 'prop-types'
import { Card } from 'semantic-ui-react'

import Post from './Post'

class PostList extends React.Component {
  render () {
    const { posts, onVote, onDeletePost } = this.props
    return (
      <Card.Group itemsPerRow={2}>
        {posts.map((post, index) => {
          return (
            <Post key={index} post={post} onVote={onVote} onDeletePost={onDeletePost} />
          )
        })}
      </Card.Group>
    )
  }
}

PostList.propTypes = {
  posts: array.isRequired,
  onVote: func.isRequired,
  onDeletePost: func.isRequired
}

export default PostList
