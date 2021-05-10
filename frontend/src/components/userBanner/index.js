import React, { Component } from 'react'
import styles from './userBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon, AvatarUpload } from '..'

@inject('store') @observer
class UserBanner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      upAvatar: null,
      draggingOverAvatar: false,
      draggingOverBanner: false
    }
  }

  onEditAvatar = (input) => {
    input.value = ''

    if (input.target.files && input.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.setState({
          upAvatar: reader.result
        })
      })
      reader.readAsDataURL(input.target.files[0])
    }

    this.onAvatarDragLeave()
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

  closeAvatarUpload = () => {
    this.setState({
      upAvatar: null
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
                    onChange={this.onEditAvatar} onDragEnter={this.onBannerDragEnter} onDragLeave={this.onBannerDragLeave}
                />
                <div className={`${styles.bannerEditActionBtn}`}>
                  <Icon iconName={'Pen'} />
                </div>
              </div>
          )}
        </div>

        { this.state.upAvatar && (
            <AvatarUpload img={this.state.upAvatar} closeAvatarUpload={this.closeAvatarUpload} changeAvatar={this.changeAvatar}/>
        )}
      </section>
    )
  }
}

export default UserBanner
