import React, { Component } from 'react'
import styles from './mobileBar.scss'

class MobileBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className={ styles.contentHolder }>
        <nav className={ styles.mobileBar }>
          <ul className={ styles.mobileBarItems }>
            { this.props.children }
          </ul>
        </nav>
      </div>
    )
  }

}

export default MobileBar
