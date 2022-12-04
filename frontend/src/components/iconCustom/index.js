import React, { Component } from 'react'
import { Icon } from '@mui/material'
import styles from './iconCustom.scss'

class IconCustom extends Component {

  render() {
    const { className, iconName, onClick, onMouseDown, onMouseUp, style } = this.props

    return (
      <Icon
        className={ `${ className } ${ styles.iconCustom }` }
        onMouseDown={ onMouseDown }
        onMouseUp={ onMouseUp }
        onClick={ onClick }
        style={ style }
      >
        <img className={ styles.iconCustomImage } src={ iconName } alt='Custom Icon' />
      </Icon>
    )
  }
}

export default IconCustom
