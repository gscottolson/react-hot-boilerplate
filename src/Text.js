import {StyleSheet, css} from 'aphrodite'
import React from 'react'
import ReactDOM from 'react-dom'

const size = 40

const styles = StyleSheet.create({
  component: {
    border: '2px solid transparent',
    borderWidth: '0 0 2px',
    fontFamily: 'serif',
    fontSize: 20,
    lineHeight: '30px',
    margin: '.3em 0',
    minHeight: 30,
    resize: 'none',
    width: '100%',
    ':focus': {
      borderColor: '#ddd',
      outline: 0,
    }
  },
})

export default class Text extends React.Component {
  constructor(props) {
    super()
    this.state = {height: 20}
  }

  componentDidUpdate() {
    if (this.props.hasFocus && this.ref) {
      this.ref.focus()
    }
  }

  handleBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.id)
    }
  }

  handleFocus = (event) => {
    if (this.props.onFocus) {
      this.props.onFocus(this.props.id)
    }
  }

  handleChange = (event) => {
    if (this.props.onChange) {
      const text = ReactDOM.findDOMNode(event.currentTarget).value
      this.props.onChange({id: this.props.id, text})
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter' || (event.ctrlKey && event.key === 'm')) {
      // ignore newline commands from the keyboard
      event.preventDefault()

      if (this.props.onEnter) {
        this.props.onEnter()
      }
    }
  }

  handleScroll = (event) => {
    this.setState({height: this.ref.scrollHeight})
  }

  render() {
    return (
      <textarea
        autoFocus={this.props.autoFocus}
        className={css(styles.component)}
        defaultValue={this.props.defaultValue}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onScroll={this.handleScroll}
        ref={(textarea) => this.ref = textarea}
        style={{height: this.state.height}}
      />
    )
  }
}
