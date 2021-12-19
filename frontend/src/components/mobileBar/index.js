import React, { Component } from 'react'
import styles from './mobileBar.scss'

class MobileBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className={ styles.mobileNavContainer }>
        { this.props.children }
      </div>
    )
  }

}

export default MobileBar
