import React, { Component } from 'react'
import styles from './postSection.scss'
import { Icon } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostSection extends Component {
  constructor(props) {
    super(props)
    this.state = { addClass: false }
  }

  selected() {
    this.setState({ addClass: !this.state.addClass })
  }

  render() {
    const { user } = this.props.store
    const { paragraph, className } = this.props
    let editing = [styles.paragraphEdit]

    return (
      <section className={styles.paragraphWrapper}>
        {user.loggedIn && <span className={editing} onClick={this.selected.bind(this)}><Icon iconName={'Pen'} className={styles.icon} /> {this.state.addClass ? 'Paragraph - Editing' : 'Paragraph'}</span>}

        <p className={[styles.paragraph, ...className || ''].join(' ')}>{paragraph ||
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}</p>
      </section>
    )
  }
}

export default PostSection
