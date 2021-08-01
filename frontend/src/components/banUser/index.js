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

    saveBan (event) {
        event.preventDefault()

        const payload = {
            username: this.props.user.username,
            days: event.target[0].value,
            reason: event.target[1].value
        }

        let url = 'ban'
        if ( this.props.store.profile.role == 'moderator') {
            url = 'shortBan'
        }

      
        Axios.patch(url, payload, { withCredentials: true }).then( res => {
            this.props.closePopup()
        }).catch(err => {
            const { error } = err.response.data

            this.setState({ error: [error] })
        })
    }

    callBack() {}

    render() {
        const { error } = this.state

        return (
            <div className={ styles.banUser }>
                <div className={ styles.banUserBackground } onClick={this.props.closePopup}/>
                <section className={ styles.banUserPopUp }>
                    <div>
                        <form onSubmit={this.saveBan.bind(this)}>
                                <FormInput errors={ this.state.error } name={ 'Days' } callBack={ this.callBack } className={[ styles.formGroup ]} type='number'></FormInput>
                                <FormInput errors={ this.state.error } name={ 'Reason' } callBack={ this.callBack } className={[ styles.formGroup ]} type='text'></FormInput>
                                <div className={styles.submitWrapper}>
                                    <Button
                                        className={ styles.banUserPopUpBtnsCancelButton } value='Cancel'
                                        inverted={ true } onClick={ this.props.closePopup.bind(this) }
                                    />
                                    { (
                                        <Button
                                            className={ styles.banUserPopUpBtnsSaveButton }
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
