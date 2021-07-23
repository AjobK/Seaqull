import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import styles from './banUser.scss'
import { Button } from '../../components'
import { FormInput } from '../../components'
import 'react-image-crop/dist/ReactCrop.css'

@inject('store') @observer
class BanUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null
        }
    }

    saveBan (e) {
        e.preventDefault()

        const payload = {
            username: this.props.user.username,
            days: e.target[0].value,
            reason: e.target[1].value
        }

      
        Axios.patch('/ban', payload, { withCredentials: true }).then( res => {
            this.props.closePopup()
        }).catch(err => {
            const { error } = err.response.data
            this.setState({ error: error })
        })
    }

    callBack() {}

    render() {
        const { error } = this.state

        return (
            <div className={ styles.avatarUpload }>
                <div className={ styles.avatarUploadBackground } onClick={this.props.closePopup}/>
                <section className={ styles.avatarUploadPopUp }>
                    <div className={styles.formWrapper}>
                        <form onSubmit={this.saveBan.bind(this)} className={styles.form}>
                                <FormInput errors={this.state.error} name={"Days"} callBack={this.callBack} className={[styles.formGroup]} type="number"></FormInput>
                                <FormInput errors={this.state.error} name={"Reason"} callBack={this.callBack} className={[styles.formGroup]} type="text"></FormInput>
                                <div className={styles.submitWrapper}>
                                    <Button
                                        className={ styles.avatarUploadPopUpBtnsCancelButton } value='Cancel'
                                        inverted={ true } onClick={ this.props.closePopup.bind(this) }
                                    />
                                    { (
                                        <Button
                                            className={ styles.avatarUploadPopUpBtnsSaveButton }
                                            value={ 'Save' }
                                            type='button'
                                        />
                                    )}
                                </div>

                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

export default BanUser
