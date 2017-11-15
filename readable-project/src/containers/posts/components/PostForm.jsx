import React from 'react'
import {array, bool, func} from 'prop-types'
import { Form, Modal, Header, Button, Icon } from 'semantic-ui-react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import config from '../../../modules/posts/config'
import PostsSelector from '../../../modules/posts/selector'
import CategoriesSelector from '../../../modules/categories/selector'
import PostsActions from '../../../modules/posts/actions'
import CategoriesActions from '../../../modules/categories/actions'
import TextField from '../../components/form/TextField'
import TextArea from '../../components/form/TextArea'
import SelectField from '../../components/form/SelectField'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class PostForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {timestamp: Date.now() }
  }

  render () {
    const {categoriesOptions, onToggleModal, open, onSavePost} = this.props
    return (
      <Modal open={open}>
        <Header icon='pencil' content='Create a new post' />
        <Modal.Content>
          <Form>
            <Field component={TextField} name='title' label='Title' required />
            <Field component={TextField} name='author' label='Author' />
            <Field component={SelectField} name='category' options={categoriesOptions} label='Category' required />
            <Field component={TextArea} name='body' label='Content of the post' required />
            <Button color='red' onClick={onToggleModal}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' floated='right' type='button' onClick={onSavePost}><Icon name='check' /> Save the post</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

PostForm.propTypes= {
  categoriesOptions: array.isRequired,
  open: bool.isRequired,
  onToggleModal: func.isRequired,
  onSavePost: func.isRequired
}

const mapStateToProps = (state) => ({
  editedPost: PostsSelector.getCurrentEntity(state),
  categoriesOptions:  CategoriesSelector.getCategoriesOptions(state)
})

const ConnectedPostForm = connect(mapStateToProps, mapDispatchToProps)(PostForm)

const ConnectedForm = reduxForm({
  form: config.storeBranch
})(ConnectedPostForm)

export default ConnectedForm
