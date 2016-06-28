import {StyleSheet, css} from 'aphrodite'
import React from 'react'

const size = 40

const styles = StyleSheet.create({
  component: {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: '50%',
    color: '#ddd',
    fontSize: 20,
    height: size,
    width: size,
    ':focus': {
      backgroundColor: '#ddd',
      color: '#fff',
      outline: 'none',
    },
    ':disabled': {
      opacity: 0.1,
    }
  },
})

export default class PlusButton extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({index: this.props.index})
    }
  }

  render() {
    return(
      <button
        className={css(styles.component)}
        disabled={this.props.disabled}
        onClick={this.handleClick}
      >+</button>
    )
  }
}
