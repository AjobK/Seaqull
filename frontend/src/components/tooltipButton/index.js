import React, { Component } from 'react'
import styles from './tooltipButton.scss'
import { Icon } from '../../components'

class TooltipButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { iconName, icon, prefix, mouseDown } = this.props

    return (
      <button onMouseDown={ mouseDown } className={ styles.tooltipButton }>
        <Icon prefix={ prefix } iconName={ iconName } icon={ icon } />
      </button>
    )
  }

}

export default TooltipButton
