import React from  'react'

export function createLabel (text, fieldRequired) {
  const requiredIndicator = fieldRequired ? <span style={{color: 'red'}}>*</span> : null
  const labelDiv = text ? <label>{text}{requiredIndicator}</label> : null
  return labelDiv
}