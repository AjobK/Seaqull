import React, { Component } from 'react'
import styles from './profileCard.scss'
import { observer, inject } from 'mobx-react'
import { Icon, Button, Cropper } from '../'
import Axios from 'axios'
import { Editor, EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js'
import URLUtil from '../../util/urlUtil'
import ColorUtil from '../../util/colorUtil'
import ProfileInfo from '../profileInfo'

@inject('store')
@observer
class ProfileCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: props.posts,
      loggedIn: this.props.loggedIn,
      following: !!this.props.user.following,
      followsYou: this.props.user.followsYou,
      upAvatar: null,
      draggingOverAvatar: false,
      editingBio: false,
      editorState: EditorState.createEmpty(),
      changedContent: false,
      icon: 'Pen',
    }

    this.stateLockDelay = 500
    this.changeStateLock = null
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
  }

  componentDidMount = () => {
    this.setDescription()
  }

  componentDidUpdate(prevProps) {
    const { username, following, followsYou } = this.props.user

    if (username !== prevProps.user.username) {
      this.setState({
        following,
        followsYou
      })
    }
  }

  onEditAvatar = (input) => {
    this.handleInput(input, 'upAvatar')
    this.onAvatarDragLeave()
  }

  handleInput = (input, stateVar) => {
    input.value = ''

    if (input.target.files && input.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.setState({
          [stateVar]: reader.result
        })
      })
      reader.readAsDataURL(input.target.files[0])
    }
  }

  onAvatarDragEnter = () => {
    this.setState({
      draggingOverAvatar: true
    })
  }

  onAvatarDragLeave = () => {
    this.setState({
      draggingOverAvatar: false
    })
  }

  changeAvatar = (newAvatar) => {
    this.props.user.picture = newAvatar
  }

  closePopup = () => {
    this.setState({
      upAvatar: null,
      upBanner: null,
      banUser: false
    })
  }

  follow = () => {
    const username = URLUtil.getLastPathArgument()

    Axios.post(`${ this.props.store.defaultData.backendUrl }/profile/follow/${ username }`, {}, {
      withCredentials: true
    })
      .then((res) => {
        this.setState({ following: res.data.following || false },
          this.props.changeFollowerCount(res.data.following ? 1 : -1))
      })
  }

  getFollowText = () => {
    const { followsYou, following } = this.state

    if (followsYou) {
      return following ? 'Friends' : 'Follow back'
    } else {
      return following ? 'Following' : 'Follow'
    }
  }

  getFollowButtonClass = () => {
    const { followsYou, following } = this.state

    if (followsYou && following) {
      return styles.friends
    } else if (following) {
      return styles.following
    }
  }

  onChangeBio = (editorState) => {
    const user = this.props.user

    user.description = convertToRaw(editorState.getCurrentContent())

    this.setState({
      user,
      editorState,
      changedContent: true
    })
  }

  setDescription = () => {
    let editorState

    try {
      editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.user.description)))
    } catch {
      editorState = EditorState.createWithContent(ContentState.createFromText(this.props.user.description))
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
      this.changeStateLock = Date.now() + this.stateLockDelay
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
        username: this.props.user.username,
        description: this.props.user.description
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
    const { user, posts } = this.props

    let editButtonValue = this.state.editingBio ? 'Save' : 'Edit Bio'

    const uniqueAvatarColorBasedOnHash = ColorUtil.getUniqueColorBasedOnString(user.username)

    return (
      <section className={ styles.wrapper }>
        <div className={ styles.profilePictureWrapper }>
          <div
            className={ styles.profilePicture }
            style={ {
              backgroundImage: `url(${ user.picture })`,
              backgroundColor: uniqueAvatarColorBasedOnHash
            } }
          >
          </div>
          { user.isOwner && (
            <span
              className={
                `${ styles.profilePictureEdit } ${ this.state.draggingOverAvatar ? styles.pictureDraggingOver : '' }`
              }
            >
              <Icon iconName={ 'Pen' } />
              <input
                type='file' accept='image/png, image/jpeg' value={ '' }
                onChange={ this.onEditAvatar }
                onDragEnter={ this.onAvatarDragEnter }
                onDragLeave={ this.onAvatarDragLeave }
                style={ {
                  backgroundImage: `url(${ user.picture })`,
                  backgroundColor: uniqueAvatarColorBasedOnHash
                } }
              />
            </span>
          )}
        </div>
        <div className={ styles.profileInfo }>
          <div className={ styles.profileInfoNameWrapper }>
            <Icon className={ styles.profileInfoBadge } iconName={ 'At' }/>
            <h2 className={ styles.profileInfoUsername }>{ user.username || 'Username' }</h2>
          </div>
          <ProfileInfo user={ this.props.user } posts={ posts } openFollowersList={ this.props.openFollowersList }/>
          <div className={ styles.profileCardButtons }>
            { this.props.profile.loggedIn && user.isOwner ?
              (<Button
                icon={ this.state.icon }
                value={ editButtonValue }
                className={ `${ styles.editButton } secondary` }
                onClick={ () => this.changeEditingState() }
                noPulse />) :
              (<Button
                value={ <span>{ this.getFollowText() } </span> }
                className={ `${ styles.followButton } ${ this.getFollowButtonClass() }` }
                onClick={ this.follow }
              />) }
            { this.props.profile.loggedIn && user.isOwner ?
              (<Button icon='Cog' className={ styles.settingsButton } noPulse />) :
              (<Button icon='CommentAlt' className={ styles.chatButton } />)
            }
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
        { this.state.upAvatar && (
          <Cropper
            inputType={ 'avatar' }
            img={ this.state.upAvatar }
            closeCropper={ this.closePopup }
            changeImage={ this.changeAvatar }
          />
        )}
      </section>
    )
  }
}

export default ProfileCard
