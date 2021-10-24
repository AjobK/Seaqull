import React, { Component } from 'react'
import styles from './userBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon, Cropper } from '..'
import Axios from 'axios'
import ColorUtil from '../../util/colorUtil'
import BanUser from '../banUser/index'
import URLUtil from '../../util/urlUtil'

@inject('store') @observer
class UserBanner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      upAvatar: null,
      upBanner: null,
      draggingOverAvatar: false,
      draggingOverBanner: false,
      following: this.props.user.following,
      followsYou: this.props.user.followsYou,
      banUser: false
    }
  }

  componentDidUpdate(prevProps) {
    const { username, following, followsYou } = this.props
    
    if (username !== username) {
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

  onEditBanner = (input) => {
    this.handleInput(input, 'upBanner')
    this.onBannerDragLeave()
  }

  handleInput = (input, stateVar) => {
    input.value = ''

    if (input.target.files && input.target.files.length > 0) {
      this.setScrollEnabled(false)
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

  onBannerDragEnter = () => {
    this.setState({
      draggingOverBanner: true
    })
  }

  onBannerDragLeave = () => {
    this.setState({
      draggingOverBanner: false
    })
  }

  changeAvatar = (newAvatar) => {
    this.props.user.picture = newAvatar
  }

  changeBanner = (newBanner) => {
    this.props.user.banner = newBanner
  }

  closePopup = () => {
    this.setScrollEnabled(true)
    this.setState({
      upAvatar: null,
      upBanner: null,
      banUser: false
    })
  }

  setScrollEnabled = (scrollEnabled) => {
    document.body.style.overflow = scrollEnabled ? 'unset' : 'hidden'
  }

  follow = () => {
    const username = URLUtil.getLastPathArgument()

    Axios.post(`${this.props.store.defaultData.backendUrl}/profile/follow/${username}`, {}, { withCredentials: true })
      .then((res) => {
        this.setState({ following: res.data.following || false },
          this.props.changeFollowerCount(res.data.following ? 1 : -1))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  banUser = () => {
    this.setState({ banUser: true })
  }

  getFollowText = () => {
    const { followsYou, following } = this.state

    if (followsYou) {
      return following ? 'Unfriend' : 'Follow back'
    } else {
      return following ? 'Unfollow' : 'Follow'
    }
  }

  getFollowIconName = () => {
    const { followsYou, following } = this.state

    if (followsYou) {
      return following ? 'UsersSlash' : 'UserFriends'
    } else {
      return following ? 'Check' : 'Reply'
    }
  }

  render() {
    const user = this.props.user
    const role = this.props.role

    let fontSize = ''

    if (user.username.length >= 22) {
      fontSize = styles.nameSmall
    } else if (user.username.length >= 14) {
      fontSize = styles.nameMedium
    } else if (user.username.length >= 8) {
      fontSize = styles.nameLarge
    }

    const uniqueAvatarColorBasedOnHash = ColorUtil.getUniqueColorBasedOnString(user.username)

    return (
      <section className={ styles.wrapper }>
        <div className={ styles.innerWrapper }>
          <div
            className={ styles.picture }
            style={ { backgroundImage: `url(${ user.picture })`, backgroundColor: uniqueAvatarColorBasedOnHash } }
          >
            { this.props.owner && (
              <span
                className={
                  `${ styles.pictureEdit } ${ this.state.draggingOverAvatar ? styles.pictureDraggingOver : '' }`
                }
              >
                <Icon iconName={ 'Pen' } />
                <input
                  type='file' accept='image/png, image/jpeg' value={ '' }
                  onChange={ this.onEditAvatar }
                  onDragEnter={ this.onAvatarDragEnter }
                  onDragLeave={ this.onAvatarDragLeave }
                  style={ { backgroundImage: `url(${ user.picture })`, backgroundColor: uniqueAvatarColorBasedOnHash } }
                />
              </span>
            )}
            { this.props.store.profile.loggedIn && !user.isOwner &&
            <button
              className={ `${ styles.follow } ${this.state.following ? styles.replied : ''}` }
              onClick={ this.follow }
            >
              <p>{ this.getFollowText() }</p>
              <Icon iconName={ this.getFollowIconName() } classNames={ styles.replyIcon } />
            </button>
            }
          </div>
          <div className={ styles.info }>
            <h2 className={ [styles.name, fontSize].join(' ') }>{ user.username || '' }</h2>
            <div className={ styles.achieved }>
              <h3 className={ styles.role }>{ user.title || '' }</h3>
            </div>
          </div>
        </div>
        <div className={ styles.banner }>
          <div className={ styles.bannerImage } style={ { backgroundImage: `url(${ user.banner })` } } />
          { this.props.owner && (
            <div
              className={
                `${ styles.bannerEdit } ${ this.state.draggingOverBanner ? styles.bannerEditDraggingOver : '' }`
              }
            >
              <input
                type='file' accept='image/png, image/jpeg' value={ '' }
                onChange={ this.onEditBanner }
                onDragEnter={ this.onBannerDragEnter }
                onDragLeave={ this.onBannerDragLeave }
              />
              <div className={ styles.bannerEditActionBtn }>
                <p className={ styles.bannerEditActionBtnText }>
                  <span>EDIT BANNER</span>
                  <Icon iconName={ 'Pen' } className={ styles.bannerEditActionBtnIcon } />
                </p>
              </div>
            </div>
          )}
          { role != 'User' & !this.props.owner & this.props.store.profile.loggedIn && (
            <div
              onDragEnter={ this.onBannerDragEnter }
              onDragLeave={ this.onBannerDragLeave }
              className={
                `${ styles.bannerEdit } ${ this.state.draggingOverBanner ? styles.bannerEditDraggingOver : '' }`
              }
            >
              <input
                type='submit'
                onChange={ this.onEditBanner }
                onDragEnter={ this.onBannerDragEnter }
                onDragLeave={ this.onBannerDragLeave }
                onClick={ () => { this.setState({ banUser: true }) } }
              />
              <div className={ styles.bannerEditActionBtn }>
                <p className={ styles.bannerEditActionBtnText }>
                  <span>BAN USER</span>
                  <Icon iconName={ 'Ban' } className={ styles.bannerEditActionBtnIcon } />
                </p>
              </div>
            </div>
          )}
        </div>

        { this.state.upAvatar && (
          <Cropper
            inputType={ 'avatar' }
            img={ this.state.upAvatar }
            closeCropper={ this.closePopup }
            changeImage={ this.changeAvatar }
          />
        )}
        { this.state.upBanner && (
          <Cropper
            inputType={ 'banner' }
            img={ this.state.upBanner }
            closeCropper={ this.closePopup }
            changeImage={ this.changeBanner }
          />
        )}
        { this.state.banUser && (
          <BanUser
            user={ user }
            closePopup={ this.closePopup }
          />
        )}
      </section>
    )
  }
}

export default UserBanner
