import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {func, array} from 'prop-types'

import {CREATE_OPERATION} from '../modules/posts/operations'

import CategoriesActions from '../modules/categories/actions'
import PostsActions from '../modules/posts/actions'

import CategoriesSelector from '../modules/categories/selector'
import PostsSelector from '../modules/posts/selector'

import PostFormModal from './posts/PostForm'

const mapDispatchToProps = (dispatch) => {
  return {
    categoryActions: bindActionCreators(CategoriesActions, dispatch),
    postActions: bindActionCreators(PostsActions, dispatch)
  }
}

class Sidebar extends React.Component {

  componentDidMount () {
    this.props.categoryActions.fetchAll()
  }

  handleNewModalClick = () => {
    const {postActions} = this.props
    const newPost = PostsSelector.createPostDraft()
    postActions.setEditedEntity(newPost)
    postActions.showEditModal(CREATE_OPERATION)
  }

  render () {
    const { categories, afterPostUpsert } = this.props
    return (
      <Segment>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Header as='h3'>Categories</Header>
          <Button color='green' type='button' onClick={this.handleNewModalClick}>
            <Icon name='plus' /> New post
          </Button>
        </div>
        <ul>
          {
            categories.map((category, index) => <li key={index}><Link to={`${category.path}`}>{category.name}</Link></li>)
          }
        </ul>
        <PostFormModal afterPostUpsert={afterPostUpsert} />
      </Segment>
    )
  }
}

Sidebar.propTypes = {
  afterPostUpsert: func.isRequired,
  categories: array.isRequired
}

const mapStateToProps = (state) => {
  return {
    categories: CategoriesSelector.getCategories(state)
  }
}
const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default ConnectedSidebar
