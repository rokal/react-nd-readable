import React from 'react'
import {Form, Select, Button, TextArea, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PostsActions from './../../modules/posts/actions'
import CategoriesActions from './../../modules/categories/actions'
import CategoriesSelector from './../../modules/categories/selector'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostsActions, dispatch),
    categoriesActions: bindActionCreators(CategoriesActions, dispatch)
  }
}

class EditPostPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.categoriesActions.fetchAll();
  }

  render() {
    const {categoriesOptions} = this.props
    console.log(categoriesOptions)
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Post title: </label>
            <input placeholder='title here' value={this.state.title}/>
          </Form.Field>
          <Form.Field>
            <label>Author :</label>
            <input placeholder='author here' value={this.state.author} />
          </Form.Field>
          <Form.Field>
            <label>Category :</label>
            <Select value={this.state.category} placeholder='Choose a category'  options={categoriesOptions} />
          </Form.Field>
          <Form.Field>
            <label>Content of the post</label>
            <TextArea placeholder='content here' />
          </Form.Field>
          <Button color='green' floated='right' type='submit'><Icon name='check' /> Save the post</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categoriesOptions: CategoriesSelector.getCategoriesOptions(state)
  }
}

const connectedPage  = connect(mapStateToProps, mapDispatchToProps)(EditPostPage)
export default connectedPage