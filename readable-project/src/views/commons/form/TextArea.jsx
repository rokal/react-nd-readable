import React from 'react'
import {Form} from 'semantic-ui-react'
import {createLabel} from '../utils'
import { object, string } from 'prop-types'
const SemanticField = Form.Field

export default class TextArea extends React.Component {
  render () {
    const { input, label, required } = this.props
    const labelDiv = createLabel(label, required)
    return (
      <SemanticField >
        <label>{labelDiv}</label>
        <textarea {...input} ></textarea>
      </SemanticField>
    )
  }

}
TextArea.propTypes = {
  input: object.isRequired,
  label: string
}
