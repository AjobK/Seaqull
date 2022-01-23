import React, { Component } from 'react'
import styles from './draftjsTooltipButton.scss'
import { Icon } from '../../components'

class DraftJsTooltipButton extends Component {
  constructor(props) {
    super(props)
  }

  // switchIconType = (iconType, iconName, icon, prefix) => {
  //   console.log(iconType)
  //
  //   switch (iconType) {
  //     case iconType.startsWith('header'):
  //       return <figure><img src={ iconName } alt={ iconName }/></figure>
  //     default:
  //       return <Icon prefix={ prefix } iconName={ iconName } icon={ icon } />
  //   }
  // }

  render() {
    const { isHeadingButton, iconName, icon, prefix, mouseDown } = this.props
    console.log('../../static/icons/inlineToolbar/' + iconName + '.svg' )

    return (
      <button onMouseDown={ mouseDown } className={ styles.draftJsButton }>
        { isHeadingButton
          ? <figure><img src={ '../../static/icons/inlineToolbar/' + iconName + '.svg' } alt={ iconName }/></figure>
          : <Icon prefix={ prefix } iconName={ iconName } icon={ icon } />
        }
      </button>
    )
  }

}

export default DraftJsTooltipButton
