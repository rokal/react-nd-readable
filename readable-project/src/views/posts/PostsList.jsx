import React from 'react'
import { array, object } from 'prop-types'
import { Card } from 'semantic-ui-react'
import {findIndex} from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PostsActions from './../../modules/posts/actions'
import CategoriesActions from './../../modules/categories/actions'

import {UPDATE_OPERATION} from './../../modules/posts/operations'

import CategoriesSelector from './../../modules/categories/selector'
import PostsSelector from '../../modules/posts/selector'

import { notify } from '../../modules/app/Notificator'
import NotificationTypes from '../../modules/app/notificationTypes'

import Post from './Post'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class PostList extends React.Component {
  componentDidMount () {
    const { categoriesActions } = this.props
    categoriesActions.fetchAll()
  }

  handlePostVote = (postId, voteOption) => {
    const { postActions } = this.props
    postActions.votePost(postId, voteOption)
  }

  handlePostCreation = () => {
    const { postActions, editedPost, posts } = this.props
    const isNew=findIndex(posts, ['id', editedPost.id]) === -1
    const method = isNew ? postActions.createPost : postActions.updateRemotePost
    const notificatonDetails = !isNew ? {title: 'Post update', message: 'Post successfully updated'}:{title: 'Post creation', message: 'Post successfully created'}
    method(editedPost, (post) => {
      this.setState({ showModal: !this.state.showModal })
      notify({ type: NotificationTypes.SUCCESS, ...notificatonDetails })
    })
  }

  handleDeleteCategoryFilter = () => {
    const {postActions} = this.props
    postActions.removeCategoryFilter()
    postActions.fetchAll()
  }

  handleDeletePost = (postId) => {
    const {postActions} = this.props
    postActions.deletePost(postId, () => {
      postActions.removePost(postId);
      notify({ type: NotificationTypes.SUCCESS, title: 'Post deletion', message: 'Post successflly deleted' })
    })
  }

  handleLaunchEditModal = (post) => {
    const {postActions} = this.props
    postActions.setEditedEntity(post)
    postActions.showEditModal(UPDATE_OPERATION)
  }
  render () {
    const { posts } = this.props
    return (
      <Card.Group itemsPerRow={2}>
        {posts.map((post, index) => {
          return (
            <Post key={index} post={post} onVote={this.handlePostVote} onDeletePost={this.handleDeletePost} onEdit={this.handleLaunchEditModal} />
          )
        })}
        {
          posts.length === 0 && (
            <div style={{padding: '20px'}}>
              There is no post to display
            </div>
          )
        }
      </Card.Group>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categoriesOptions: CategoriesSelector.getCategoriesOptions(state),
    postFilters: PostsSelector.getPostFilters(state) || {}
  }
}

PostList.propTypes = {
  posts: array.isRequired,
  categoriesOptions: array.isRequired,
  postFilters: object.isRequired
}

const ConnectedPostList = connect(mapStateToProps, mapDispatchToProps)(PostList)
export default ConnectedPostList
