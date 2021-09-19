import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
import { Cropper, Icon } from '..'
import { Link } from 'react-router-dom'
import PopUp from '../popUp'
import ColorUtil from '../../util/colorUtil'
import InputUtil from '../../util/inputUtil'

@inject('store')
@observer
class PostBanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      popUpOpen: false,
      draggingOverThumbnail: true
    }
  }

  updatePopup() {
    this.setState({
      popUpOpen: !this.state.popUpOpen,
    })
  }

  onThumbnailDragEnter = () => {
    this.setState({
      draggingOverThumbnail: true
    })
  }

  onThumbnailDragLeave = () => {
    this.setState({
      draggingOverThumbnail: false
    })
  }

  onEditThumbnail = (input) => {
    // this.handleInput(input, 'upThumbnail')
    InputUtil.handleInput(input, (result) => {
      this.setState({
        upThumbnail: result
      })
    })
    this.onThumbnailDragLeave()
  }

  changeThumbnail = (newThumbnail) => {
    // TODO change to thumbnail
    this.props.user.picture = newThumbnail
  }

  closeCropper = () => {
    this.setState({
      upThumbnail: null
    })
  }

  render() {
    const { author, isOwner } = this.props
    const uniqueAvatarColorBasedOnHash = ColorUtil.getUniqueColorBasedOnString(author.name)

    const content = {
      title: 'Delete Post',
      description: 'Are you sure you want to delete this post?',
      close: this.updatePopup.bind(this),
      actions: [
        {
          title: 'Cancel',
          action: this.updatePopup.bind(this),
          primary: false,
        },
        {
          title: 'Confirm',
          action: this.props.archivePost,
          primary: true,
        },
      ],
    }

    const canBanUser = this.props.store.profile.role != 'User' && this.props.store.profile.role != 'user'

    return (
      <section className={ `${styles.wrapper} ${isOwner ? styles.owner : ''}` }>
        <input
          type='file' accept='image/png, image/jpeg' value={ '' }
          onChange={ this.onEditThumbnail }
          onDragEnter={ this.onThumbnailDragEnter }
          onDragLeave={ this.onThumbnailDragLeave }
        />
        <div className={ styles.background } style={ { backgroundImage: `url(${author.bannerURL})` } } />
        {this.props.isOwner && (
          <div className={ styles.wrapperEditContainer }>
            <span className={ styles.wrapperEdit }>
              <span className={ styles.wrapperEditContent }>Click to edit</span> <Icon iconName={ 'Pen' } />
            </span>
          </div>
        )}
        {canBanUser && (
          <div className={ styles.backdrop } onClick={ this.updatePopup.bind(this) }>
            <p className={ styles.bannerText }>
              Delete Post
              <Icon className={ styles.icon } iconName={ 'Trash' } />
            </p>
          </div>
        )}
        {this.state.popUpOpen && <PopUp content={ content }></PopUp>}
        <div className={ styles.innerWrapper }>
          <div className={ styles.info }>
            <Link to={ `/profile/${author.name}` } className={ styles.profileLink }>
              <div className={ styles.infoInner }>
                <div
                  className={ styles.picture }
                  style={ {
                    backgroundImage: `url(${author.avatarURL || ''})`,
                    backgroundColor: uniqueAvatarColorBasedOnHash,
                  } }
                />
                <div className={ styles.user_info }>
                  <h2 className={ [styles.name].join(' ') }>{author.name || ''}</h2>
                  <div className={ styles.achieved }>
                    <h3 className={ styles.role }>{author.title || ''}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          { this.state.upThumbnail && (
            <Cropper
              inputType={ 'thumbnail' }
              img={ this.state.upThumbnail }
              closeCropper={ this.closeCropper }
              changeImage={ this.changeThumbnail }
            />
          )}
        </div>
      </section>
    )
  }
}

export default PostBanner
