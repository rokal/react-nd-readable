import React from 'react'
import { number, func } from 'prop-types'
import { Button, Icon, Label } from 'semantic-ui-react'

class CustomRating extends React.Component {
  render () {
    const {score, onVote} = this.props
    const iconName = score === 0 ? 'meh' : (score > 0 ? 'smile' : 'frown')
    return (
      <div style={{display: 'inline-block'}}>
        <Label><Icon size='large' name={iconName} /> {score}</Label>
        <Label type='button' as={Button} color='red' onClick={() => onVote('downVote') }>
          <Icon name='thumbs down' />
        </Label>
        <Label type='button' as={Button} color='green' onClick={() => onVote('upVote') }>
          <Icon name='thumbs up' />
        </Label>
      </div>
    )
  }
}

CustomRating.propTypes = {
  score: number.isRequired,
  onVote: func.isRequired
}

export default CustomRating
