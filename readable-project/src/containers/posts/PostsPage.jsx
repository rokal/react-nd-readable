import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button, Icon, Header, Label} from 'semantic-ui-react'
import {values} from 'lodash'
import PostsActions from './../../modules/posts/actions'
import CategoriesActions from './../../modules/categories/actions'
import CategoriesSelector from './../../modules/categories/selector'
import PostsSelector from '../../modules/posts/selector'
import PostList from './components/PostsList'
import PostFormModal from './components/PostForm'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class PostsPage extends Component{
  constructor (props) {
    super(props)
    this.state = {showModal: false}
  }

  componentDidMount() {
    const {categoriesActions, postActions} = this.props
    postActions.fetchAll();
    categoriesActions.fetchAll()
  }

  toggleNewPostModal = () => {
    const newPost = PostsSelector.createPostDraft()
    this.props.postActions.setEditedEntity(newPost)
    this.setState({showModal:!this.state.showModal})
  }

  handlePostVote = (postId, voteOption) => {
    const {postActions} = this.props
    postActions.votePost(postId, voteOption)
  }

  handlePostCreation = () => {
    const {postActions, editedPost} = this.props
    postActions.createPost(editedPost, (post) => {
      // some notification here
      this.setState({showModal:!this.state.showModal})
    })
  }

  render () {
    const {postsById, categoriesOptions} = this.props
    const posts = values(postsById)
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
          <Button floated='right' color='green' type='button' onClick={this.toggleNewPostModal}>
            <Icon name='plus' /> New post
          </Button>
        </Header>
        
        <PostList posts={posts} onVote={this.handlePostVote} />

        <PostFormModal
          open={this.state.showModal}
          categoriesOptions={categoriesOptions}
          onToggleModal={this.toggleNewPostModal}
          onSavePost={this.handlePostCreation}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postsById: PostsSelector.getEntities(state),
    categoriesOptions: CategoriesSelector.getCategoriesOptions(state),
    editedPost: PostsSelector.getEditedEntity(state)
  }
}

const ConnectedPage = connect(mapStateToProps, mapDispatchToProps)(PostsPage)
export default ConnectedPage
