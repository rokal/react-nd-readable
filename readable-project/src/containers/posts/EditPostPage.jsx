import React from 'react'
import { Icon, Segment, Item, Header, Label, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get, capitalize, values } from 'lodash'
import { Link } from 'react-router-dom'

// actions
import PostsActions from './../../modules/posts/actions'
import CategoriesActions from './../../modules/categories/actions'
import CommentsActions from '../../modules/comments/actions'
// selectors
import PostsSelector from './../../modules/posts/selector'
import CommentsSelector, {getEditedComment} from '../../modules/comments/selector'

// components
import Rating from '../components/Rating'
import CommentsList from '../comments/CommentsList'
import CommentForm from '../comments/CommentForm'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch),
    commentsActions: bindActionCreators(CommentsActions, dispatch)
  }
}

class EditPostPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editMode: false, post: {}, isNew: false }
  }

  componentDidMount () {
    const { match, postActions, categoriesActions, commentsActions } = this.props
    const id = match.params.id
    postActions.getCurrentEntity(id)
    categoriesActions.fetchAll();
    commentsActions.fetchPostComments(id)
    commentsActions.initializeCommentForm(id)
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
    const {editedComment, commentsActions} = this.props
    commentsActions.createComment(editedComment, (comment) => {
      console.log(comment)
    })
  }

  render () {
    const { currentPost, commentsById, editedComment } = this.props
    const creationDate = new Date()
    creationDate.setTime(currentPost.timestamp)
    return (
      <div>
        <Segment>
          <Item>
            <Item.Content>
              <Item.Header color='blue'>
                <Header as='h3'>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <CommentsList comments={values(commentsById)} onVoteComment={this.handleCommentVote} />
        <CommentForm editedComment={editedComment} onSaveComment={this.handleSaveComment} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: PostsSelector.getCurrentEntity(state),
    commentsById: CommentsSelector.getComments(state),
    editedComment: getEditedComment(state)
  }
}

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(EditPostPage)
export default connectedPage