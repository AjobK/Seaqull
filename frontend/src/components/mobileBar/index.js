import React, { Component } from 'react'
import styles from './mobileBar.scss'

class MobileBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className={ styles.mobileBar }>
        <div className={ styles.mobileBarContainer }>
          <div className={ styles.mobileNavContainer }>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }

}

export default MobileBar
