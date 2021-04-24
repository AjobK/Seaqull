import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import styles from './avatarUpload.scss'
import { Button } from '../../components'

@inject('store') @observer
class AvatarUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            upAvatar: null,
            error: ''
        }
    }

    componentDidMount() {
        this.validateImage(this.props.img)
    }

    validateImage = (img) => {
        const allowedFileTypes = ['jpeg', 'png']
        const maxFileSizeKB = 40

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
            upAvatar: img
        })
    }

    saveAvatar = () => {
        this.props.changeAvatar(this.state.upAvatar) // put in Axios response
        this.props.closeAvatarUpload()

        // TODO send to API
        Axios.post(`${this.props.store.defaultData.backendUrl}/profile/UPLOAD-AVATAR-ROUTE`, this.state.upAvatar, {withCredentials: true})
            .then((res) => {

            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.props.history.push('/login/')
                }
            })
    }

    render() {
        return (
            <div className={styles.avatarUpload}>
                <div className={styles.avatarUploadBackground} onClick={this.props.closeAvatarUpload}/>
                <section className={styles.avatarUploadPopUp}>
                    <div className={styles.uploadedImgWrapper}>
                        <div className={styles.uploadedImg}>
                            { !this.state.error && (
                                <img src={this.state.upAvatar} alt='Avatar'/>
                            )}
                            { this.state.error && (
                                <p className={styles.errorMessage}>{this.state.error}</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.avatarUploadPopUpBtns}>
                        <Button
                            className={styles.avatarUploadPopUpBtnsCancelButton} value={this.state.error ? 'Back' : 'Cancel'}
                            inverted={true} onClick={this.props.closeAvatarUpload}
                        />
                        { !this.state.error && (
                            <Button
                                className={styles.avatarUploadPopUpBtnsSaveButton}
                                value={'Save'} disabled={!this.state.upAvatar}
                                onClick={this.state.upAvatar ? this.saveAvatar : undefined}
                            />
                        )}
                    </div>
                </section>
            </div>
        )
    }
}

export default AvatarUpload
