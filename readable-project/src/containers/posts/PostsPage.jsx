import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {values} from 'lodash'
import PostsActions from './../../modules/posts/actions'
import CategoriesActions from './../../modules/categories/actions'
import PostsSelector from '../../modules/posts/selector'
import PostList from './components/PostsList'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class PostsPage extends Component{

  componentDidMount() {
    this.props.postActions.fetchAll();
  }

  handlePostVote = (postId, voteOption) => {
    const {postActions} = this.props
    postActions.votePost(postId, voteOption)
  }

  render () {
    const {postsById} = this.props
    const posts = values(postsById)
    return (
      <div>
        <PostList posts={posts} onVote={this.handlePostVote}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postsById: PostsSelector.getEntities(state)
  }
}

const ConnectedPage = connect(mapStateToProps, mapDispatchToProps)(PostsPage)
export default ConnectedPage
