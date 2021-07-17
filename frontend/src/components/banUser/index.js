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

    saveUser () {
        const payload = {
            username: this.props.user.username,
            days: 30,
            reason: "being a twat"
          }
      
          Axios.patch('/ban', payload, { withCredentials: true }).then( res => {
            console.log('succes')
          }).catch(err => {
              console.log(err)
          })
    }

    render() {
        const { error } = this.state

        return (
            <div className={ styles.avatarUpload }>
                <div className={ styles.avatarUploadBackground } onClick={this.props.closePopup}/>
                <section className={ styles.avatarUploadPopUp }>
                    <form onSubmit={this.saveUser} className={styles.form}>      
                        <div className={ styles.avatarUploadPopUpBtns }>
                            <Button
                                className={ styles.avatarUploadPopUpBtnsCancelButton } value={ error ? 'Back' : 'Cancel' }
                                inverted={ true } onClick={ this.props.closeCropper }
                            />
                            { !error && (
                                <Button
                                    className={ styles.avatarUploadPopUpBtnsSaveButton }
                                    value={ 'Save' }
                                    onClick={ this.saveUser }
                                />
                            )}
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

export default BanUser
