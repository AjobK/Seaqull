import React, { Component } from 'react'
import styles from './userBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon, Cropper } from '..'

@inject('store') @observer
class UserBanner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      upAvatar: null,
      upBanner: null,
      draggingOverAvatar: false,
      draggingOverBanner: false
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

  closeCropper = () => {
    this.setState({
      upAvatar: null,
      upBanner: null
    })
  }

  render() {
    const user = this.props.user

    let fontSize = ''

    if (user.username.length >= 22) {
      fontSize = styles.nameSmall
    } else if (user.username.length >= 14) {
      fontSize = styles.nameMedium
    } else if (user.username.length >= 8) {
      fontSize = styles.nameLarge
    }

    return (
      <section className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.picture} style={{ backgroundImage: `url(${user.picture})` }}>
            <span className={styles.levelMobile}>{ user.level || ''}</span>
            { this.props.owner && (
                <span className={`${styles.pictureEdit} ${this.state.draggingOverAvatar ? styles.pictureDraggingOver : ''}`}>
                  <Icon iconName={'Pen'} />
                  <input
                      type="file" accept="image/png, image/jpeg" value={''}
                      onChange={this.onEditAvatar} onDragEnter={this.onAvatarDragEnter} onDragLeave={this.onAvatarDragLeave}
                  />
                </span>
            )}
          </div>
          <div className={styles.info}>
            <h2 className={[styles.name, fontSize].join(' ')}>{ user.username || ''}</h2>
            <div className={styles.achieved}>
              <span className={styles.level}>{ user.level || ''}</span>
              <h3 className={styles.role}>{ user.title || ''}</h3>
            </div>
          </div>
        </div>
        <div className={styles.banner}>
          <div className={styles.bannerImage} style={{ backgroundImage: `url(${user.banner})` }}/>
          { this.props.owner && (
              <div className={`${styles.bannerEdit} ${this.state.draggingOverBanner ? styles.bannerEditDraggingOver : ''}`}>
                <input
                    type="file" accept="image/png, image/jpeg" value={''}
                    onChange={this.onEditBanner} onDragEnter={this.onBannerDragEnter} onDragLeave={this.onBannerDragLeave}
                />
                <div className={`${styles.bannerEditActionBtn}`}>
                  <Icon iconName={'Pen'} />
                </div>
              </div>
          )}
        </div>

        { this.state.upAvatar && (
            <Cropper inputType={'avatar'} img={this.state.upAvatar} closeCropper={this.closeCropper} changeAvatar={this.changeAvatar}/>
        )}
        { this.state.upBanner && (
            <Cropper inputType={'banner'} img={this.state.upBanner} closeCropper={this.closeCropper} changeBanner={this.changeBanner}/>
        )}
      </section>
    )
  }
}

export default UserBanner
