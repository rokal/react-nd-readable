import React, { Component } from 'react';
import { connect } from 'react-redux'
import {findIndex} from 'lodash'
import { bindActionCreators } from 'redux'
import { Button, Icon, Header, Label, Grid } from 'semantic-ui-react'
import PostsActions from './../../modules/posts/actions'
import CategoriesActions from './../../modules/categories/actions'
import CategoriesSelector from './../../modules/categories/selector'
import PostsSelector from '../../modules/posts/selector'
import PostList from './components/PostsList'
import PostFormModal from './components/PostForm'
import Sidebar from '../Sidebar'
import { notify } from '../../modules/app/Notificator'
import NotificationTypes from '../../modules/app/notificationTypes'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class PostsPage extends Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false }
  }

  componentDidMount () {
    const { categoriesActions, postActions } = this.props
    postActions.fetchAll();
    categoriesActions.fetchAll()
  }

  toggleNewPostModal = () => {
    const newPost = PostsSelector.createPostDraft()
    this.props.postActions.setEditedEntity(newPost)
    this.setState({ showModal: !this.state.showModal })
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
      postActions.fetchAll();
      notify({ type: NotificationTypes.SUCCESS, title: 'Post deletion', message: 'Post successflly deleted' })
    })
  }

  handleLaunchEditModal = (post) => {
    this.props.postActions.setEditedEntity(post)
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    const { posts, categoriesOptions, postFilters } = this.props
    return (
      <div>
        <Grid centered>
          <Grid.Column width={4} style={{ minHeight: '74vh' }}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12} style={{ minHeight: '74vh' }}>
            <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
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
              </span>
              <Button color='green' type='button' onClick={this.toggleNewPostModal}>
                <Icon name='plus' /> New post
          </Button>
            </Header>
            <div style={{ padding: '5px' }}>
              {postFilters.category && (
                <span>Category: <Label onClick={this.handleDeleteCategoryFilter} >
                  {postFilters.category === 'asc' ? 'Ascending order' : 'Descending order'}
                  <Icon name='delete'/>
                </Label></span>
              )}
              {postFilters.title && (
                <span>Title starting with: <Label>
                  {postFilters.title}
                </Label></span>
              )}
              {postFilters.order && (
                <span>Order: <Label>
                  {postFilters.order}
                </Label></span>
              )}
            </div>
            <PostList posts={posts} onVote={this.handlePostVote} onDeletePost={this.handleDeletePost} onEdit={this.handleLaunchEditModal} />

            <PostFormModal
              open={this.state.showModal}
              categoriesOptions={categoriesOptions}
              onToggleModal={this.toggleNewPostModal}
              onSavePost={this.handlePostCreation}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: PostsSelector.getFilteredEntities(state),
    categoriesOptions: CategoriesSelector.getCategoriesOptions(state),
    editedPost: PostsSelector.getEditedEntity(state),
    postFilters: PostsSelector.getPostFilters(state) || {}
  }
}

const ConnectedPage = connect(mapStateToProps, mapDispatchToProps)(PostsPage)
export default ConnectedPage
