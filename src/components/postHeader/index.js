import React, { Component } from 'react'
import styles from './postHeader.scss'
import { Icon } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostHeader extends Component {
  constructor(props) {
    super(props)
    this.state = { addClass: false }
  }

  selected() {
    this.setState({ addClass: !this.state.addClass })
  }

  render() {
    const { user } = this.props.store
    const { heading, className } = this.props
    let editing = [styles.titleEdit]


    return (
      <section className={styles.title}>
        {user.loggedIn && <span className={editing} onClick={this.selected.bind(this)}><Icon iconName={'Pen'} className={styles.icon} /> {this.state.addClass ? 'Heading - Editing' : 'Heading'} </span>}
        <h3 className={[styles.title, ...className || ''].join(' ')}>{heading || 'Sample title'}</h3>
      </section>
    )
  }
}

export default PostHeader