import React, { Component } from 'react'
import styles from './avatarUpload.scss'
import { inject, observer } from 'mobx-react'
import { Button } from '../../components'
import Axios from 'axios'

@inject('store') @observer
class AvatarUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            upAvatar: null
        }
    }

    componentDidMount() {
        this.setState({
            upAvatar: this.props.img
        })
    }

    saveAvatar = () => {
        let payload = new FormData()
        payload.append('avatar', this.state.upAvatar)

        Axios.post(`${this.props.store.defaultData.backendUrl}/profile/avatar`, payload, {withCredentials: true})
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
                <div className={`${styles.avatarUploadBackground}`} onClick={this.props.closeAvatarUpload}/>
                <section className={styles.avatarUploadPopUp}>
                    <div className={styles.uploadedImgWrapper}>
                        <div className={styles.uploadedImg}>
                            <img src={this.state.upAvatar} alt=""/>
                        </div>
                    </div>
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
