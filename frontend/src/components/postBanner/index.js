import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
import { Cropper, Icon } from '..'
import { Link } from 'react-router-dom'
import { ColorUtil, InputUtil } from '../../util/'
import Axios from 'axios'
import { popUpData } from '../popUp/popUpData'

@inject('store') @observer
class PostBanner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      thumbnail: this.props.post.thumbnail,
      popUpOpen: false,
      draggingOverThumbnail: true
    }
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.fetchDefaultThumbnail()
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
    InputUtil.handleInput(input, (result) => {
      this.setState({
        upThumbnail: result
      })
    })
    this.onThumbnailDragLeave()
  }

  changeThumbnail = (newThumbnail) => {
    if (!this.props.isNew) {
      this.setState({
        thumbnail: newThumbnail
      })

      return
    }

    this.props.onThumbnailAdded(newThumbnail)

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      this.setState({
        thumbnail: reader.result
      })
    })
    reader.readAsDataURL(newThumbnail)
  }

  fetchDefaultThumbnail = () => {
    const { defaultData, notification } = this.props.store

    Axios.get(`${defaultData.backendUrl}/post/thumbnail/default`)
      .then((res) => {
        this.setState({
          thumbnail: res.data.thumbnail
        })
      })
      .catch(() => {
        notification.setContent(popUpData.messages.networkError)
      })
  }

  closeCropper = () => {
    this.setState({
      upThumbnail: null
    })
  }

  render() {
    const { author, isOwner } = this.props

    const uniqueAvatarColorBasedOnHash = ColorUtil.getUniqueColorBasedOnString(author.name)

    return (
      <section className={ `${ styles.wrapper } ${ isOwner ? styles.owner : '' }` }>
        <div
          className={ styles.background }
          style={ { backgroundImage: `url(${ this.state.thumbnail })` } }
        />

        { isOwner && (
          <div className={ styles.wrapperThumbnailEdit }>
            <input
              type='file' accept='image/png, image/jpeg' value={ '' }
              onChange={ this.onEditThumbnail }
              onDragEnter={ this.onThumbnailDragEnter }
              onDragLeave={ this.onThumbnailDragLeave }
            />

            <div className={ styles.wrapperThumbnailEditButtonContainer }>
              <span className={ styles.wrapperThumbnailEditButton }>
                <span className={ styles.wrapperThumbnailEditButtonContent }>Click to edit</span>
                <Icon iconName={ 'Pen' } />
              </span>
            </div>
          </div>
        ) }

        <div className={ styles.innerWrapper }>
          <div className={ styles.info }>
            <Link to={ `/profile/${ author.name }` } className={ styles.profileLink }>
              <div className={ styles.infoInner }>
                <div
                  className={ styles.picture }
                  style={ {
                    backgroundImage: `url(${author.avatarURL || ''})`,
                    backgroundColor: uniqueAvatarColorBasedOnHash
                  } }
                />
                <div className={ styles.user_info }>
                  <h2 className={ [styles.name].join(' ') }>{ author.name || '' }</h2>
                  <div className={ styles.achieved }>
                    <h3 className={ styles.role }>{ author.title || '' }</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          { this.state.upThumbnail && (
            <Cropper
              inputType={ 'thumbnail' }
              img={ this.state.upThumbnail }
              entityId={ this.props.post.path }
              closeCropper={ this.closeCropper }
              changeImage={ this.changeThumbnail }
              returnOnSave={ this.props.isNew }
            />
          )}
        </div>
      </section>
    )
  }
}

export default PostBanner
