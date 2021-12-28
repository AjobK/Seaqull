import React, { Component } from 'react'
import styles from './draftjsTooltipButton.scss'

class DraftJsTooltipButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { iconName, onButtonClick } = this.props

    return (
      <button onMouseDown={ onButtonClick } className={ styles.draftJsButton }>
        <figure>
          <img src={ iconName } alt={ iconName } />
        </figure>
      </button>
    )
  }

}

export default DraftJsTooltipButton
