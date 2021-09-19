import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { styles } from './profileCard.scss'

@inject('store') @observer
class ProfileCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: props.user,
      //   editing: false,
      //   editorState: EditorState.createEmpty(),
      //   changedContent: false,
      //   icon: 'Pen',
      loggedIn: this.props.loggedIn
    }

    this.changeStateLock = null
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
  }

  render() {
    const user = this.props.user

    return (
      <section className={ styles.wrapper }>

      </section>
    )
  }
}

export default ProfileCard
