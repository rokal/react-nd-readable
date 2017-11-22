import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PostsSelector from '../modules/posts/selector'

import PostsActions from './../modules/posts/actions'
import CategoriesActions from './../modules/categories/actions'

import Sidebar from './Sidebar'
import Filter from './commons/Filter'
import PostsList from './posts/PostsList'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class CategoryView extends React.Component {
  componentDidMount () {
    const { match, postActions } = this.props
    const category = match.params.categoryId
    postActions.setEntities([])
    postActions.findPostByCategory(category)
  }

  componentWillReceiveProps(nextProps) {
    const { match, postActions } = this.props
    const category = match.params.categoryId
    const nextCategory = nextProps.match.params.categoryId
    if(category !== nextCategory) {
      postActions.setEntities([])
      postActions.findPostByCategory(nextCategory)
    }
  }

  handleAfterPostUpsert = (post) => {
    const {match, postActions} = this.props
    const category = match.params.categoryId
    if(post.category === category) {
      postActions.addPost(post)
    }
  }


  render () {
    const { posts } = this.props
    return (
      <Grid centered>
        <Grid.Column width={4} style={{ minHeight: '74vh' }}>
          <Sidebar afterPostUpsert={this.handleAfterPostUpsert} />
        </Grid.Column>
        <Grid.Column width={11} style={{ minHeight: '74vh' }}>
          <Header>Total of the posts: {posts.length}</Header>
          <Filter style={{ marginBottom: '5px' }} />
          <PostsList posts={posts} />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: PostsSelector.getFilteredEntities(state),
  }
}
const connectedCategoryView = connect(mapStateToProps, mapDispatchToProps)(CategoryView)
export default connectedCategoryView
