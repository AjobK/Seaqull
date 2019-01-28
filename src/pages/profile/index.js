import React from 'react'
import App from '../App'
import { Standard } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { Redirect } from "react-router-dom"
import { UserBanner } from '../../components'

@inject('store') @observer
class Profile extends App {
	render() {
		const { user } = this.props.store

		if (!user.loggedIn) return <Redirect to='/500'/>

		return (
			<Standard>
				<UserBanner />
			</Standard>
		)
	}
}

export default Profile
