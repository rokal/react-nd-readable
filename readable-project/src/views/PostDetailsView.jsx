import React from 'react'
import { Icon, Segment, Item, Header, Label, Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get, capitalize, isEmpty } from 'lodash'
import { Link } from 'react-router-dom'

// notification
import { notify } from '../modules/app/Notificator'
import NotificationTypes from '../modules/app/notificationTypes'

import {UPDATE_OPERATION} from '../modules/posts/operations'

// actions
import PostsActions from './../modules/posts/actions'
import CategoriesActions from './../modules/categories/actions'
import CommentsActions from '../modules/comments/actions'
// selectors
import PostsSelector from './../modules/posts/selector'
import { getEditedComment, getComments } from '../modules/comments/selector'

// components
import Rating from './commons/Rating'
import CommentsList from './comments/CommentsList'
import CommentForm from './comments/CommentForm'
import PostFormModal from './posts/PostForm'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch),
    commentsActions: bindActionCreators(CommentsActions, dispatch)
  }
}

class PostDetailsView extends React.Component {

  componentDidMount () {
    const { match, postActions, categoriesActions, commentsActions, history } = this.props
    const { postId, categoryId } = match.params
    categoriesActions.fetchAll();
    postActions.getCurrentEntity(postId, null, (error) => {
      history.push(`/${categoryId}`)
      notify({ type: NotificationTypes.ERROR, title: 'Post retrieve', message: `There was an error while fetching the post with the id: ${postId}` })
    })
    commentsActions.fetchPostComments(postId)
    commentsActions.initializeCommentForm(postId)
  }

  handlePostVote = (voteOption) => {
    const { postActions, currentPost } = this.props
    postActions.votePost(currentPost.id, voteOption, (post) => {
      postActions.setCurrentEntity(post)
    })
  }

  handleCommentVote = (commentId, voteOption) => {
    const { commentsActions } = this.props
    commentsActions.voteComment(commentId, voteOption, (comment) => {
      commentsActions.updateComment(commentId, comment)
    })
  }

  handleSaveComment = () => {
    const { editedComment, commentsActions } = this.props
    commentsActions.createComment(editedComment)
  }

  handleDeleteComment = (commentId) => {
    const { commentsActions, match } = this.props
    const postId = match.params.postId
    commentsActions.deleteComment(commentId, () => {
      commentsActions.fetchPostComments(postId)
    })
  }

  handleDeletePost = () => {
    const {postActions, history, currentPost} = this.props
    postActions.deletePost(currentPost.id, () => {
      postActions.removePost(currentPost.id);
      history.push('/')
      notify({ type: NotificationTypes.SUCCESS, title: 'Post deletion', message: 'Post successflly deleted' })
    })
  }

  handAfterPostUpsert = (post) => {
    const {postActions} = this.props
    postActions.updatePost(postActions.id, post)
    postActions.setCurrentEntity(post)
  }

  handleLaunchEditModal = () => {
    const {postActions, currentPost} = this.props
    postActions.setEditedEntity(currentPost)
    postActions.showEditModal(UPDATE_OPERATION)
  }

  render () {
    const { currentPost, comments, editedComment, match } = this.props
    const creationDate = new Date()
    creationDate.setTime(currentPost.timestamp)
    const category = match.params.categoryId
    return (
      <Grid centered>
        <Grid.Column width={11} style={{ minHeight: '74vh' }}>
          {isEmpty(currentPost) && (<div>
            ERROR 404: This post no more exists.
            <Link to='/'>Click here to go to the home page</Link>
          </div>)}
          {!isEmpty(currentPost) && (
            <div>
              <Segment>
                <Item>
                  <Item.Content>
                    <Item.Header color='blue'>
                      <Header as='h3'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{get(currentPost, 'title', '')}</span>
                          <span><Link to={`/${category}`}><Icon name='reply' /> Back to <Label>{category} </Label>posts</Link></span>
                        </div>
                        <Header.Subheader>
                          by {capitalize(get(currentPost, 'author', ''))}
                        </Header.Subheader>
                        <Header.Subheader>
                          <Icon name='calendar' /> {creationDate.toUTCString()}
                        </Header.Subheader>
                      </Header>
                    </Item.Header>
                    <Item.Description>
                      <Label as='a' tag>{currentPost.category}</Label>
                    </Item.Description>
                  </Item.Content>
                </Item>
                <Container text> {currentPost.body}</Container>
                <Container textAlign='right'>
                <Label style={{ cursor: 'pointer' }} color='blue' title='comment number'><Icon name='comment' />{comments.length}</Label>
                  <Rating score={currentPost.voteScore || 0} onVote={this.handlePostVote} />
                  <Label style={{ cursor: 'pointer' }} color='blue' title='edit' onClick={this.handleLaunchEditModal}><Icon name='pencil' /></Label>
                  <Label style={{ cursor: 'pointer' }} color='red' title='delete' onClick={this.handleDeletePost}>X</Label>
                </Container>
              </Segment>
              <CommentsList comments={comments} onVoteComment={this.handleCommentVote} onDeleteComment={this.handleDeleteComment} />
              <CommentForm editedComment={editedComment} onSaveComment={this.handleSaveComment} />
            </div>
          )}
        </Grid.Column>
        <PostFormModal afterPostUpsert={this.handAfterPostUpsert} />
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: PostsSelector.getCurrentEntity(state),
    comments: getComments(state),
    editedComment: getEditedComment(state)
  }
}

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(PostDetailsView)
export default connectedPage