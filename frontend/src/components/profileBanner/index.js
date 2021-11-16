import React, { Component } from 'react'
import styles from './profileBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon, Cropper, BanUser } from '..'
import { InputUtil } from '../../util/'

@inject('store') @observer
class ProfileBanner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      upBanner: null,
      draggingOverBanner: false,
      banUser: false
    }
  }

  onEditBanner = (input) => {
    InputUtil.handleInput(input, (result) => {
      this.setState({
        upBanner: result
      })
    })
    this.onBannerDragLeave()
  }

  handleInput = (input, stateVar) => {
    input.value = ''
    const files = input?.target?.files

    if (files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.setState({
          [stateVar]: reader.result
        })
      })
      reader.readAsDataURL(files[0])
    }
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

  changeBanner = (newBanner) => {
    this.props.user.banner = newBanner
  }

  banUser = () => {
    this.setState({ banUser: true })
  }

  closeCropper = () => {
    this.setState({
      upBanner: null,
      banUser: false
    })
  }

  render() {
    const { user, role } = this.props

    return (
      <section className={ styles.wrapper }>
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
          { role != 'User' && !this.props.owner && this.props.store.profile.loggedIn && (
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
                onClick={ this.banUser }
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

        { this.state.upBanner && (
          <Cropper
            inputType={ 'banner' }
            img={ this.state.upBanner }
            closeCropper={ this.closeCropper }
            changeImage={ this.changeBanner }
          />
        )}
        { this.state.banUser && (
          <BanUser
            user={ user }
            closePopup={ this.closeCropper }
          />
        )}
      </section>
    )
  }
}

export default ProfileBanner
