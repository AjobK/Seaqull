import React, { Component } from 'react'
import styles from './postEditHeading.scss'
import { Icon } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostLike extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button/>
    )
  }
}

export default PostLike
