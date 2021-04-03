import React, { Component } from 'react'
import styles from './avatarUpload.scss'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class AvatarUpload extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.avatarUpload}>
                <div className={`${styles.avatarUploadBackground}`} onClick={this.props.closeAvatarUpload}/>
                <section className={styles.avatarUploadPopUp}>
                    {/*<img src={this.props.img} alt=""/>*/}
                    <div className={styles.uploadedImg}>
                        <img src="https://static.wikia.nocookie.net/hip-hop-music/images/4/45/Bladee.jpeg/revision/latest?cb=20200211010116" alt=""/>
                    </div>
                    <button>Save</button>
                </section>
            </div>
        )
    }
}

export default AvatarUpload
