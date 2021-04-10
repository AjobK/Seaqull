import React, { Component, useRef, useCallback, createRef } from 'react'
import styles from './avatarUpload.scss'
import { inject, observer } from 'mobx-react'
import ReactCrop from 'react-image-crop'
import { Button } from '../../components'

@inject('store') @observer
class AvatarUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            upAvatar: null
        }
    }

    componentDidMount() {
        // this.props
        this.setState({
            upAvatar: this.props.img
            // upAvatar: 'data:image/jpeg;base64,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'
        })
    }

    // onLoad = useCallback((img) => {
    //     imgRef.current = img;
    // }, []);

    saveAvatar = () => {
        console.log(this.state.upAvatar)
    }

    render() {
        return (
            <div className={styles.avatarUpload}>
                <div className={`${styles.avatarUploadBackground}`} onClick={this.props.closeAvatarUpload}/>
                <section className={styles.avatarUploadPopUp}>
                    <div className={styles.uploadedImgWrapper}>
                        <div className={styles.uploadedImg}>
                            <img src={this.state.upAvatar} alt=""/>
                        </div>
                    </div>
                    {/*<ReactCrop*/}
                    {/*    src={this.state.upAvatar}*/}
                    {/*    onImageLoaded={this.onLoad}*/}
                    {/*    crop={crop}*/}
                    {/*    onChange={(c) => setCrop(c)}*/}
                    {/*    onComplete={(c) => setCompletedCrop(c)}*/}
                    {/*/>*/}
                    <div className={styles.avatarUploadPopUpBtns}>
                        <Button
                            className={styles.avatarUploadPopUpBtnsCancelButton} value={'Cancel'}
                            inverted={true} onClick={this.props.closeAvatarUpload}
                        />
                        <Button className={styles.avatarUploadPopUpBtnsSaveButton} value={'Save'} disabled={!this.state.upAvatar} onClick={this.state.upAvatar ? this.saveAvatar : undefined}/>
                    </div>
                </section>
            </div>
        )
    }
}

export default AvatarUpload
