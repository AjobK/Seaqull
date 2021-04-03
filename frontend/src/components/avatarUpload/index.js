import React, { Component, useRef, useCallback, createRef } from 'react'
import styles from './avatarUpload.scss'
import { inject, observer } from 'mobx-react'
import ReactCrop from 'react-image-crop'

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
            upAvatar: 'https://static.wikia.nocookie.net/hip-hop-music/images/4/45/Bladee.jpeg/revision/latest?cb=20200211010116'
        })
    }

    onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    saveAvatar = () => {
        console.log(this.props.img)
    }

    render() {
        return (
            <div className={styles.avatarUpload}>
                <div className={`${styles.avatarUploadBackground}`} onClick={this.props.closeAvatarUpload}/>
                <section className={styles.avatarUploadPopUp}>
                    <div className={styles.uploadedImg}>
                        <img src={this.state.upAvatar} alt=""/>
                    </div>
                    <ReactCrop
                        src={this.state.upAvatar}
                        onImageLoaded={this.onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                    />
                    <button onClick={this.saveAvatar}>Save</button>
                </section>
            </div>
        )
    }
}

export default AvatarUpload
