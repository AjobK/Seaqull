import React, { Component } from 'react'
import { Icon } from '../../components'
import styles from './draftjsTooltipButton.scss'

class DraftJsTooltipButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { iconName, onButtonClick } = this.props

    return (
      <button onMouseDown={ onButtonClick } className={ styles.draftJsButton }>
        <Icon iconName={ iconName }/>
      </button>
    )
  }

}

export default DraftJsTooltipButton
