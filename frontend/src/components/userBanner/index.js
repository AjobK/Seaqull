import React, { Component } from 'react'
import styles from './userBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon, Cropper } from '..'
import Axios from 'axios'
import BanUser from '../banUser/index'

@inject('store') @observer
class UserBanner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      upAvatar: null,
      upBanner: null,
      draggingOverAvatar: false,
      draggingOverBanner: false,
      following: this.props.user.following || false,
      banUser: false
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
    const username = window.location.pathname.split('/').filter(i => i != '').pop()

    Axios.post(`${this.props.store.defaultData.backendUrl}/profile/follow/${username}`, {}, { withCredentials: true })
        .then((res) => {
          this.setState({ following: res.data.following || false })
        })
        .catch(err => {
          console.log('Something went wrong')
        })
  }

  banUser() {
    this.setState({ banUser: true })
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

    return (
        <section className={ styles.wrapper }>
          <div className={ styles.innerWrapper }>
            <div className={ styles.picture } style={{ backgroundImage: `url(${user.picture})` }}>
              <span className={ styles.levelMobile }>{ user.level || '' }</span>
              { this.props.owner && (
                  <span className={ `${ styles.pictureEdit } ${ this.state.draggingOverAvatar ? styles.pictureDraggingOver : '' }` }>
                  <Icon iconName={ 'Pen' } />
                  <input
                      type="file" accept="image/png, image/jpeg" value={''}
                      onChange={ this.onEditAvatar } onDragEnter={ this.onAvatarDragEnter } onDragLeave={ this.onAvatarDragLeave }
                  />
                </span>
              )}
              { this.props.store.profile.loggedIn && !user.isOwner &&
              <button className={ `${ styles.follow } ${this.state.following ? styles.replied : ''}` } onClick={ this.follow }>
                <p>{ this.state.following ? 'unfollow' : 'follow' }</p>
                <Icon iconName={ this.state.following ? 'Check' : 'Reply' } classNames={ styles.replyIcon } />
              </button>
              }
            </div>
            <div className={ styles.info }>
              <h2 className={ [styles.name, fontSize].join(' ') }>{ user.username || '' }</h2>
              <div className={ styles.achieved }>
                <span className={ styles.level }>{ user.level || '' }</span>
                <h3 className={ styles.role }>{ user.title || '' }</h3>
              </div>
            </div>
          </div>
          <div className={ styles.banner }>
            <div className={ styles.bannerImage } style={{ backgroundImage: `url(${ user.banner })` }} />
            { this.props.owner && (
                <div className={ `${ styles.bannerEdit } ${ this.state.draggingOverBanner ? styles.bannerEditDraggingOver : '' }` }>
                  <input
                      type="file" accept="image/png, image/jpeg" value={''}
                      onChange={ this.onEditBanner } onDragEnter={ this.onBannerDragEnter } onDragLeave={ this.onBannerDragLeave }
                  />
                  <div className={ `${ styles.bannerEditActionBtn }` }>
                    <Icon iconName={ 'Pen' } />
                  </div>
                </div>
            )}
            { role != 'user' & !this.props.owner & this.props.store.profile.loggedIn && (
                <div onDragEnter={ this.onBannerDragEnter } onDragLeave={ this.onBannerDragLeave } className={ `${ styles.bannerEdit } ${ this.state.draggingOverBanner ? styles.bannerEditDraggingOver : '' }` }>
                <input
                    type="submit"
                    onChange={ this.onEditBanner } 
                    onDragEnter={ this.onBannerDragEnter } 
                    onDragLeave={ this.onBannerDragLeave }
                    onClick={ this.banUser.bind(this) }
                />
                <div className={ `${ styles.bannerEditActionBtn }` }>
                  <Icon iconName={ 'Ban' } />
                </div>
              </div>
            )}
          </div>

          { this.state.upAvatar && (
              <Cropper inputType={'avatar'} img={this.state.upAvatar} closeCropper={this.closePopup} changeImage={this.changeAvatar}/>
          )}
          { this.state.upBanner && (
              <Cropper inputType={'banner'} img={this.state.upBanner} closeCropper={this.closePopup} changeImage={this.changeBanner}/>
          )}
          { this.state.banUser && (
              <BanUser user={user} closePopup={this.closePopup}></BanUser>
          )}
        </section>
    )
  }
}

export default UserBanner
