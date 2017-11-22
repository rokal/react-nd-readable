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

class Home extends React.Component {

  componentDidMount () {
    this.props.postActions.fetchAll()
  }
  handleAfterPostUpsert = (post) => {
    const {postActions} = this.props
    postActions.addPost(post)
  }
  render () {
    const {posts} = this.props
    return (
      <Grid centered>
        <Grid.Column width={4} style={{ minHeight: '74vh' }}>
          <Sidebar afterPostUpsert={this.handleAfterPostUpsert} />
        </Grid.Column>
        <Grid.Column width={11} style={{ minHeight: '74vh' }}>
          <Header>Total of the posts: {posts.length}</Header>
          <Filter style={{marginBottom: '5px'}} />
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

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export default connectedHome
