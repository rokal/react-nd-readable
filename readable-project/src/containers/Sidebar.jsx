import React from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { Segment, Header, Form } from 'semantic-ui-react'
import TextField from './components/form/TextField'
import Select from './components/form/SelectField'
import PostActions from '../modules/posts/actions'
import CategoriesActions from '../modules/categories/actions'
import CategoriesSelector from '../modules/categories/selector'
import PostsSelector from '../modules/posts/selector'
import config from './../modules/posts/config'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostActions, dispatch),
    categoryActions: bindActionCreators(CategoriesActions, dispatch)
  }
}
class Sidebar extends React.Component {

  componentWillMount = () => {
    this.props.postActions.initializeFilterForm()
  }

  handleCategoryChange = (e, value) => {
    this.props.postActions.findPostByCategory(value)
  }

  render () {
    const { categoriesOptions } = this.props
    const padding  = { padding: '5px' }
    return (
      <Segment>
        <Header as='h2'>Filters</Header>
        <Form>
          <Field name='title' label='By title' placeholder='Search...' component={TextField} />
          <Field onChange={this.handleCategoryChange} name='category' label='By category:' options={categoriesOptions} component={Select} placeholder='select ...' />
          <div style={padding}>
            <div>Order:</div>
            <div style={padding}>
                <label style={{marginRight: '10px'}}>
                  <Field
                    name="order"
                    component="input"
                    type="radio"
                    value="asc"
                  />{' '}
                  ASC
              </label>
                <label>
                  <Field
                    name="order"
                    component="input"
                    type="radio"
                    value="desc"
                  />{' '}
                  DESC
              </label>
            </div>
          </div>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categoriesOptions: CategoriesSelector.getCategoriesOptions(state),
    filters: PostsSelector.getPostFilters(state)
  }
}

const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
const ConnectedSidebarForm = reduxForm({ form: config.filterForm })(ConnectedSidebar)

export default ConnectedSidebarForm
