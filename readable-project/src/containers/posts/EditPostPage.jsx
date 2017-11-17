import React from 'react'
import { Icon, Segment, Item, Header, Label, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get, capitalize } from 'lodash'

import PostsActions from './../../modules/posts/actions'
import CategoriesActions from './../../modules/categories/actions'
import PostsSelector from './../../modules/posts/selector'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class EditPostPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editMode: false, post: {}, isNew: false }
  }

  componentDidMount () {
    const { match, postActions } = this.props
    const id = match.params.id
    postActions.getCurrentEntity(id)
    this.props.categoriesActions.fetchAll();
  }

  handlePostVote = (voteOption) => {
    const { postActions, currentPost } = this.props
    postActions.votePost(currentPost.id, voteOption, (post) => {
      postActions.setCurrentEntity(post)
    })
  }

  render () {
    const { currentPost } = this.props
    const creationDate = new Date()
    creationDate.setTime(currentPost.timestamp)
    return (
      <Segment>
        <Item>
          <Item.Content>
            <Item.Header color='blue'>
              <Header as='h3'>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>{get(currentPost, 'title', '')}</span>
                  <span><Link to='/posts'><Icon name='reply' /> Back to posts list</Link></span>
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
        <Container textAlign='right'><Rating score={currentPost.voteScore || 0} onVote={this.handlePostVote} /></Container>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: PostsSelector.getCurrentEntity(state)
  }
}

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(EditPostPage)
export default connectedPage