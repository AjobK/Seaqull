import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import styles from './cropper.scss'
import { Button } from '../../components'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

@inject('store')
@observer
class Cropper extends Component {
  constructor(props) {
    super(props)

    this.AVATAR = 'avatar'
    this.BANNER = 'banner'
    this.THUMBNAIL = 'thumbnail'

    this.BANNER_ASPECT = 16 / 9
    this.AVATAR_ASPECT = 1
    this.THUMBNAIL_ASPECT = 16 / 9

    this.state = {
      inputImage: null,
      crop: this.getCrop(),
      error: '',
    }
  }

  componentDidMount() {
    this.validateImage(this.props.img)
    this.setScrollEnabled(false)
  }

  componentWillUnmount() {
    this.setScrollEnabled(true)
  }

  getCrop = () => {
    let aspect

    switch (this.props.inputType) {
      case this.AVATAR:
        aspect = this.AVATAR_ASPECT

        break
      case this.BANNER:
        aspect = this.BANNER_ASPECT

        break
      case this.THUMBNAIL:
        aspect = this.THUMBNAIL_ASPECT

        break
    }

    return {
      unit: '%',
      width: 100,
      aspect,
    }
  }

  onImageLoaded = (image) => {
    this.imageRef = image
  }

  onCropComplete = (crop) => {
    this.makeClientCrop(crop).then()
  }

  onCropChange = (crop) => {
    this.setState({ crop })
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImage = await this.getCroppedImg(this.imageRef, crop)

      this.setState({ croppedImage })
    }
  }

  getCroppedImg(image, crop) {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    canvas.width = crop.width
    canvas.height = crop.height

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return

        resolve(new File([blob], 'cropped', { type: 'image/png' }))
      }, 'image/png')
    })
  }

  validateImage = (img) => {
    const allowedFileTypes = ['jpeg', 'png']
    const maxFileSizeKB = 4000

    const fileSizeKB = ((3 * (img.length / 4)) / 1024).toFixed(2)
    const fileType = img.match(/[^:/]\w+(?=;|,)/)[0]

    if (!allowedFileTypes.includes(fileType))
      return this.setState({
        error: `File type is not allowed. Please use an image of the following types: ${allowedFileTypes.join(', ')}.`,
      })

    if (maxFileSizeKB < fileSizeKB)
      return this.setState({
        error:
        `File size of ${fileSizeKB} KB is not allowed. Please use an image below the maximum of ${maxFileSizeKB} KB.`,
      })

    this.setState({
      inputImage: img,
    })
  }

  saveImage = () => {
    const image = this.state.croppedImage

    const fd = new FormData()
    fd.append('file', image)

    const { inputType, store } = this.props
    let address = store.defaultData.backendUrl

    switch (inputType) {
      case this.AVATAR:
      case this.BANNER:
        address = address + '/profile/' + inputType

        break
      case this.THUMBNAIL:
        address = address + '/post/' + inputType + '/' + this.props.entityId

        break
    }

    Axios.put(address, fd, {
      withCredentials: true,
      'content-type': 'multipart/form-data',
    })
      .then((res) => {
        this.props.changeImage(res.data.url)
        this.props.closeCropper()
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.props.history.push('/login/')
        }
      })
  }

  setScrollEnabled = (scrollEnabled) => {
    document.body.style.overflow = scrollEnabled ? 'unset' : 'hidden'
  }

  render() {
    const { crop, inputImage: inputImage, error } = this.state
    const isCropped = crop.height > 0 && crop.width > 0

    return (
      <div className={ styles.avatarUpload }>
        <div className={ styles.avatarUploadBackground } onClick={ this.props.closeCropper } />
        <section className={ styles.avatarUploadPopUp }>
          <div className={ `${styles.uploadedImgWrapper} ${!error ? styles.uploadedImgWrapperDarkBg : ''}` }>
            {!error && inputImage && (
              <div className={ styles.uploadedImg }>
                <ReactCrop
                  className={ styles.uploadedImgCropper }
                  src={ inputImage }
                  crop={ crop }
                  onImageLoaded={ this.onImageLoaded }
                  onComplete={ this.onCropComplete }
                  onChange={ this.onCropChange }
                />
              </div>
            )}
            {error && (
              <div className={ styles.errorMessageWrapper }>
                <p className={ styles.errorMessage }>{error}</p>
              </div>
            )}
          </div>
          <div className={ styles.avatarUploadPopUpBtns }>
            <Button
              className={ styles.avatarUploadPopUpBtnsCancelButton }
              value={ error ? 'Back' : 'Cancel' }
              inverted={ true }
              onClick={ this.props.closeCropper }
            />
            {!error && (
              <Button
                className={ styles.avatarUploadPopUpBtnsSaveButton }
                value={ 'Save' }
                disabled={ !inputImage || !isCropped }
                onClick={ inputImage && isCropped ? this.saveImage : undefined }
              />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default Cropper
