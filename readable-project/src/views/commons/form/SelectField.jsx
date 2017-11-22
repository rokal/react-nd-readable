import React from 'react'
import { Select } from 'semantic-ui-react'
import { object, string, array, bool, any } from 'prop-types'

import { createLabel } from '../utils'

class SelectField extends React.Component {

  onChange = (event, option) => {
    this.props.input.onChange(option.value)
  }
  render () {
    const { name, placeholder, label, options, disabled, required, value, input } = this.props
    const textFieldProps = {...input, disabled}
    const labelDiv = createLabel(label, required)

    return (
      <div>
        {labelDiv}
        <div>
          <Select
            {...textFieldProps}
            options={options}
            value={value || input.value}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

SelectField.propTypes = {
  input: object.isRequired,
  resetValue: any,
  label: string,
  placeholder: string,
  options: array,
  autoLoad: bool
}

export default SelectField
