import React, { Component } from 'react'
import styles from './profileCard.scss'
import { observer, inject } from 'mobx-react'
import { Icon, Button } from '../'
import Axios from 'axios'
import { Editor, EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js'

@inject('store')
@observer
class ProfileCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: props.user,
      profile: props.profile,
      posts: props.posts,
      loggedIn: this.props.loggedIn,
      editingBio: false,
      editorState: EditorState.createEmpty(),
      changedContent: false,
      icon: 'Pen',
    }

    this.changeStateLock = null
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
  }

  onChangeBio = (editorState) => {
    const user = this.state.user

    user.description = convertToRaw(editorState.getCurrentContent())

    this.setState({
      user,
      editorState,
      changedContent: true
    })
  }

  componentDidMount = () => {
    this.setDescription()
  }

  setDescription = () => {
    let editorState

    try {
      editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.user.description)))
    } catch {
      editorState = EditorState.createWithContent(ContentState.createFromText(this.state.user.description))
    }

    this.setState({ editorState })
  }

  changeEditingState() {
    if (!this.state.editingBio && this.changeStateLock < Date.now()) {
      this.setState({
        editingBio: true,
        icon: 'Save'
      })

      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState)
      })
    } else if (this.changeStateLock < Date.now() || this.changeStateLock == null) {
      this.changeStateLock = Date.now() + 500
      this.saveNewDescription()

      this.setState({
        editingBio: false,
        icon: 'Pen'
      })
    }
  }

  saveNewDescription = () => {
    if (this.state.changedContent) {
      const payload = {
        username: this.state.user.username,
        description: this.state.user.description
      }

      this.setState({
        editingBio: false,
        icon: 'Pen'
      })

      Axios.put('/profile', payload, { withCredentials: true })
      this.setState({ changedContent: false })
    }
  }

  render() {

    let editButtonValue = this.state.editingBio ? 'Save' : 'Edit'
    const posts = this.props.posts

    return (
      <section className={ styles.wrapper }>
        <div className={ styles.profilePictureWrapper }>
          <div className={ styles.profilePicture } style={ { backgroundImage: `url(${ this.state.user.picture })` } }>
          </div>
        </div>
        <div className={ styles.profileInfo }>
          <div className={ styles.profileNameWrapper }>
            <Icon className={ styles.profileInfoBadge } iconName={ 'At' }/>
            <h2 className={ styles.profileInfoUsername }>{ this.state.user.username || 'Username' }</h2>
          </div>
          <div className={ styles.profileCardFlexSection }>
            <div className={ styles.profileStatistic }>
              <p className={ styles.profileStatisticNumber }>{ this.state.user.followerCount }</p>
              <p className={ styles.profileStatisticMetric }>Followers</p>
            </div>
            <div className={ styles.profileStatistic }>
              <p className={ styles.profileStatisticNumber }>103</p>
              <p className={ styles.profileStatisticMetric }>Following</p>
            </div>
            <div className={ styles.profileStatistic }>
              <p className={ styles.profileStatisticNumber }>
                { posts.length }
              </p>
              <p className={ styles.profileStatisticMetric }>Posts</p>
            </div>
          </div>
          <div className={ styles.profileCardFlexSection }>
            { this.state.profile.loggedIn && this.state.user.isOwner ?
              (<Button
                icon={ this.state.icon }
                value={ editButtonValue }
                className={ styles.followButton }
                onClick={ () => this.changeEditingState() } />) :
              (<Button value='Follow' className={ styles.followButton } />) }
            <Button icon='CommentAlt' className={ styles.chatButton } />
          </div>
          <div className={ styles.profileCardBio }>
            <section className={ styles.editor }>
              <Editor
                readOnly={ !this.state.editingBio }
                editorState={ this.state.editorState }
                onChange={ this.onChangeBio }
                onBlur={ () => this.changeEditingState() }
                spellCheck={ true }
              />
            </section>
          </div>
        </div>
      </section>
    )
  }
}

export default ProfileCard
