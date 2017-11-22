import React from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { Segment, Form, Icon } from 'semantic-ui-react'

import PostActions from '../../modules/posts/actions'
import config from '../../modules/posts/config'

import TextField from './form/TextField'

const mapDispatchToProps = (dispatch) => {
  return {
    postActions: bindActionCreators(PostActions, dispatch)
  }
}

class Filter extends React.Component {
  componentDidMount () {
    this.props.postActions.initializeFilterForm()
  }

  render () {
    const padding = { padding: '5px' }
    const margin = { marginRight: '20px', marginLeft: '20px' }
    return (
      <Segment attached='top' style={{marginBottom: '5px'}}>
        <Form style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={padding}>
            <span>Order vote count: </span>
            <label style={margin}>
              <Field name="voteCountOrder" component="input" type="radio" value="asc" /><Icon name='sort numeric ascending' />
            </label>
            <label>
              <Field name="voteCountOrder" component="input" type="radio" value="desc" /><Icon name='sort numeric descending' />
            </label>
          </div>
          <div style={padding}>
            <span>Order by title:</span>
            <label style={margin}>
              <Field name="titleOrder" component="input" type="radio" value="asc" /><Icon name='sort alphabet ascending' />
            </label>
            <label>
              <Field name="titleOrder" component="input" type="radio" value="desc" /><Icon name='sort alphabet descending' />
            </label>
          </div>
          <Field name='title' placeholder='Search by title...' component={TextField} />
        </Form>
      </Segment>
    )
  }
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
const ConnectedFilterForm = reduxForm({ form: config.filterForm })(ConnectedFilter)

export default ConnectedFilterForm
