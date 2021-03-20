import React, { Component } from 'react'
import styles from './profileInfo.scss'
import Plus from '../../static/icons/plus.svg'
import { PreviewPost } from '../../components'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('store') @observer
class ProfileInfo extends Component {
  render() {
    return (
      <section className={styles.wrapper}>
        <p>{this.props.description}</p>
      </section>
    )
  }
}

export default ProfileInfo
