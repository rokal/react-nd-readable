import React from 'react'
import {array, bool, string, func} from 'prop-types'
import { Form, Modal, Header, Button, Icon } from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { notify } from '../../modules/app/Notificator'
import NotificationTypes from '../../modules/app/notificationTypes'

import config from '../../modules/posts/config'
import {CREATE_OPERATION} from '../../modules/posts/operations'

import PostsSelector from '../../modules/posts/selector'
import CategoriesSelector from '../../modules/categories/selector'

import PostsActions from '../../modules/posts/actions'
import CategoriesActions from '../../modules/categories/actions'

import TextField from '../commons/form/TextField'
import TextArea from '../commons/form/TextArea'
import SelectField from '../commons/form/SelectField'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class PostForm extends React.Component {

  handlePostUpsert = () => {
    const { postActions, editedPost, operation, afterPostUpsert } = this.props
    const method = operation === CREATE_OPERATION ? postActions.createPost : postActions.updateRemotePost
    const notificatonDetails = operation !== CREATE_OPERATION  ? {title: 'Post update', message: 'Post successfully updated'}:{title: 'Post creation', message: 'Post successfully created'}
    method(editedPost, (post) => {
      postActions.hideEditModal()
      if(afterPostUpsert){
        afterPostUpsert(post)
      }
      notify({ type: NotificationTypes.SUCCESS, ...notificatonDetails })
    })
  }
  isInvalid = (value) => !value || value.length < 1
  render () {
    const {categoriesOptions, showModal, postActions, editedPost={}} = this.props
    const disableSubmit = this.isInvalid(editedPost.title) || this.isInvalid(editedPost.category) || this.isInvalid(editedPost.author) || this.isInvalid(editedPost.body)
    return (
      <Modal open={showModal}>
        <Header icon='pencil' content='Create a new post' />
        <Modal.Content>
          <Form>
            <Field component={TextField} name='title' label='Title' required />
            <Field component={TextField} name='author' label='Author' />
            <Field component={SelectField} name='category' options={categoriesOptions} label='Category' required />
            <Field component={TextArea} name='body' label='Content of the post' required />
            <Button color='red' onClick={postActions.hideEditModal}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button disabled={disableSubmit} color='green' floated='right' type='button' onClick={this.handlePostUpsert}><Icon name='check' /> Save the post</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

PostForm.propTypes= {
  categoriesOptions: array.isRequired,
  showModal: bool.isRequired,
  operation: string.isRequired,
  afterPostUpsert: func.isRequired
}

const mapStateToProps = (state) => ({
  editedPost: PostsSelector.getEditedEntity(state),
  categoriesOptions:  CategoriesSelector.getCategoriesOptions(state),
  operation: PostsSelector.getOperation(state),
  showModal: PostsSelector.getModalVisibility(state)
})

const ConnectedPostForm = connect(mapStateToProps, mapDispatchToProps)(PostForm)

const ConnectedForm = reduxForm({
  form: config.storeBranch
})(ConnectedPostForm)

export default ConnectedForm
