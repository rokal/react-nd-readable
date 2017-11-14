import React from 'react'
import {array, bool, func} from 'prop-types'
import { Form, Select, TextArea, Modal, Header, Button, Icon } from 'semantic-ui-react'

class PostForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {timestamp: Date.now() }
  }

  handleCategoryChange = (event, data) => {
    this.setState({category: data.value})
  }

  handleTitleChange = (event) => {
    console.log(event.target.value)
  }

  handleAuthorChange = (event) => {
    console.log(event.target.value)
  }

  handleSubmit = (elements) => {
    const newPost = this.state
    console.log(newPost)
    this.props.onToggleModal()
  }
  render () {
    const {categoriesOptions, onToggleModal, open} = this.props
    return (
      <Modal open={open}>
        <Header icon='pencil' content='Create a new post' />
        <Modal.Content>
          <Form>
            
            <Form.Field>
              <label>Author :</label>
              <input placeholder='author here' value={this.state.author} onChange={this.handleAuthorChange}/>
            </Form.Field>
            <div>
              <label>Enter a title</label>
              <input value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
            </div>
            <Form.Field>
              <label>Category :</label>
              <Select value={this.state.category} placeholder='Choose a category' options={categoriesOptions} onChange={this.handleCategoryChange} />
            </Form.Field>
            <Form.Field>
              <label>Content of the post</label>
              <TextArea placeholder='content here' value={this.state.body} onChange={(event) => this.setState({body: event.target.value})}/>
            </Form.Field>
            <Button color='red' onClick={onToggleModal}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' floated='right' type='button' onClick={this.handleSubmit}><Icon name='check' /> Save the post</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          
        </Modal.Actions>
      </Modal>
    )
  }
}

PostForm.propTypes= {
  categoriesOptions: array.isRequired,
  open: bool.isRequired,
  onToggleModal: func.isRequired
}

export default PostForm
