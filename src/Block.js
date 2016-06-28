import PlusButton from './PlusButton'
import React from 'react'

export default class Block extends React.Component {
  render() {
    return(
      <div>
        {this.props.children}
        <PlusButton
          disabled={this.props.isButtonDisabled}
          index={this.props.index}
          onClick={this.props.onButtonClick}
        />
      </div>
    )
  }
}
