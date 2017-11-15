import React from 'react'
import { object, string, bool, number } from 'prop-types'
import { Form } from 'semantic-ui-react'
import {createLabel} from '../utils'

const SemanticField = Form.Field

const TextField = ({ width, placeholder, input, label, type, disabled, required }) => {
  const labelDiv = createLabel(label, required)
  const textFieldProps = {...input, disabled}
  return (
    <SemanticField>
      {labelDiv}
      <Form.Input {...textFieldProps} type={type} placeholder={placeholder} width={width} autoComplete="off" />
    </SemanticField>
  )
}

TextField.propTypes = {
  input: object.isRequired,
  label: string,
  type: string.isRequired,
  disabled: bool,
  required: bool,
  placeholder: string,
  width: number
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField
