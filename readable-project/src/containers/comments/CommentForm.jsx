import React from 'react'
import { object, func } from 'prop-types'
import { Form, Header, Button, Icon, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'

import config from '../../modules/comments/config'
import TextField from '../components/form/TextField'
import TextArea from '../components/form/TextArea'

class CommentForm extends React.Component {

  isEmpty = (value) => value.trim().length === 0
  render () {
    const { onSaveComment, editedComment } = this.props
    const disableSubmit = !editedComment.body || !editedComment.author || this.isEmpty(editedComment.author) || this.isEmpty(editedComment.body)
    return (
      <Segment>
        <Header icon='comment outline' content='Leave a comment' />
        <Form>
          <Field component={TextField} name='author' label='Author' required />
          <Field component={TextArea} name='body' label='Your comment' />
          <Button color='green' type='button' onClick={onSaveComment} disabled={disableSubmit}><Icon name='check' /> Submit</Button>
        </Form>
      </Segment>
    )
  }
}

CommentForm.propTypes = {
  onSaveComment: func.isRequired,
  editedComment: object.isRequired
}

const ConnectedForm = reduxForm({
  form: config.commentForm
})(CommentForm)

export default ConnectedForm
