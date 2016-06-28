import Block from './Block'
import PlusButton from './PlusButton'
import React from 'react'
import Text from './Text'
import {StyleSheet, css} from 'aphrodite'

const styles = StyleSheet.create({
  component: {
    textAlign: 'center',
    width: '100%',
  }
})

function isBlockEmpty(block) {
  return block.text.trim() === ''
}

export default class BlockEditor extends React.Component {
  constructor(props) {
    super(props)
    const id = Date.now()
    this.state = {
      activeBlockId: id,
      blocks: [{id , text: ''}]
    }
  }

  handleBlockBlur = (id) => {
    const {blocks} = this.state
    const activeIndex = blocks.findIndex((block) => block.id === id)
    if (blocks.length > 1 && blocks[activeIndex].text.trim() === '') {
      // prune the empty block when there is more than one block in the block
      // set
      blocks.splice(activeIndex, 1)
    }
    this.setState({activeBlockId: null, blocks})
  }

  handleBlockChange = ({id, text}) => {
    const {blocks} = this.state
    const activeIndex = blocks.findIndex((block) => block.id === id)
    blocks[activeIndex].text = text.trim()
    this.setState({blocks})
  }

  handleBlockFocus = (id) => {
    this.setState({activeBlockId: id})
  }

  handleButtonClick = ({index}) => {
    if (index !== 0) {
      this.insertBlock(index - 1)
      return
    }

    // hack...let’s handle the index === 0 case universally
    const {blocks} = this.state
    const id = Date.now()
    blocks.unshift({id, text: ''})
    this.setState({blocks, activeBlockId: id})
  }

  handleEnter = (event) => {
    const {activeBlockId, blocks} = this.state
    const activeIndex = blocks.findIndex((block) => block.id === activeBlockId)
    this.insertBlock(activeIndex)
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  insertBlock(activeIndex) {
    const {blocks} = this.state
    const nextBlock = blocks[activeIndex + 1]
    const id = Date.now()

    if (blocks[activeIndex].text === '') {
      // ignore enter events when the current block is empty
      return
    }

    if (nextBlock && nextBlock.text.trim() === '') {
      // if an empty block already exists following the current block, set
      // that block as the active block (instead of creating a new empty block)
      this.setState({activeBlockId: nextBlock.id})
      return
    }

    // otherwise, insert a new block directly after the current block and
    // set it as active
    blocks.splice(activeIndex + 1, 0, {id, text: ''})
    this.setState({blocks, activeBlockId: id})
  }

  render() {
    const textBlocks = this.state.blocks.map((block, index) => {
      const isActive = block.id === this.state.activeBlockId
      const isEmpty = isBlockEmpty(block)
      return (
        <Block
          index={index + 1}
          isActive={isActive}
          isButtonDisabled={isEmpty}
          key={block.id}
          onButtonClick={this.handleButtonClick}
        >
          <Text
            autoFocus={isActive}
            defaultValue={block.text}
            hasFocus={isActive}
            id={block.id}
            onBlur={this.handleBlockBlur}
            onChange={this.handleBlockChange}
            onEnter={this.handleEnter}
            onFocus={this.handleBlockFocus}
          />
        </Block>
      )
    })

    return (
      <form
        className={css(styles.component)}
        onSubmit={this.handleSubmit}
      >
        <PlusButton
          disabled={isBlockEmpty(this.state.blocks[0])}
          index={0}
          onClick={this.handleButtonClick}
        />
        {textBlocks}
      </form>
    )
  }
}
