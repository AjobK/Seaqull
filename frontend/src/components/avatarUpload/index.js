import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import styles from './avatarUpload.scss'
import { Button } from '../../components'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

@inject('store') @observer
class AvatarUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputAvatar: null,
            crop: {
                unit: '%',
                width: 100,
                aspect: 1
            },
            error: ''
        }
    }

    componentDidMount() {
        this.validateImage(this.props.img)
    }



    onImageLoaded = (image) => {
        this.imageRef = image;
    };

    onCropComplete = (crop) => {
        this.makeClientCrop(crop).then();
    };

    onCropChange = (crop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedAvatar = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedAvatar });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

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
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }



    validateImage = (img) => {
        const allowedFileTypes = ['jpeg', 'png']
        const maxFileSizeKB = 1000

        const fileSizeKB = ((3 * (img.length / 4)) / 1024).toFixed(2)
        const fileType = img.match(/[^:/]\w+(?=;|,)/)[0];

        if (!allowedFileTypes.includes(fileType))
            return this.setState({
                error: `File type is not allowed. Please use an image of the following types: ${allowedFileTypes.join(', ')}.`
            })
        if (maxFileSizeKB < fileSizeKB)
            return this.setState({
                error: `File size of ${fileSizeKB} KB is not allowed. Please use an image below the maximum of ${maxFileSizeKB} KB.`
            })

        this.setState({
            inputAvatar: img
        })
    }

    saveAvatar = () => {
        const avatar = this.state.croppedAvatar

        this.props.changeAvatar(avatar) // put in Axios response
        this.props.closeAvatarUpload()

        // TODO send to API
        Axios.post(`${this.props.store.defaultData.backendUrl}/profile/UPLOAD-AVATAR-ROUTE`, avatar, {withCredentials: true})
            .then((res) => {

            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.props.history.push('/login/')
                }
            })
    }

    render() {
        const { crop, inputAvatar, error } = this.state;

        return (
            <div className={styles.avatarUpload}>
                <div className={styles.avatarUploadBackground} onClick={this.props.closeAvatarUpload}/>
                <section className={styles.avatarUploadPopUp}>
                    <div className={styles.uploadedImgWrapper}>
                        <div className={styles.uploadedImg}>
                            { !error && inputAvatar && (
                                <ReactCrop
                                    className={styles.uploadedImgCropper}
                                    src={inputAvatar}
                                    crop={crop}
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}
                                />
                            )}
                            { error && (
                                <p className={styles.errorMessage}>{error}</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.avatarUploadPopUpBtns}>
                        <Button
                            className={styles.avatarUploadPopUpBtnsCancelButton} value={error ? 'Back' : 'Cancel'}
                            inverted={true} onClick={this.props.closeAvatarUpload}
                        />
                        { !error && (
                            <Button
                                className={styles.avatarUploadPopUpBtnsSaveButton}
                                value={'Save'} disabled={!inputAvatar}
                                onClick={inputAvatar ? this.saveAvatar : undefined}
                            />
                        )}
                    </div>
                </section>
            </div>
        )
    }
}

export default AvatarUpload
