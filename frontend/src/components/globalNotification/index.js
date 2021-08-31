import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { onSnapshot } from 'mobx-state-tree'
import { PopUp } from '../../components'

@inject('store') @observer
class GlobalNotification extends Component {
	constructor(props) {
		super(props)

		this.initNotificationListener()

		this.state = {
			isNotificationVisible: this.props.store.notification.visible
		}
	}

	initNotificationListener = () => {
		onSnapshot(this.props.store.notification, (notification) => {
			if (notification.visible !== this.state.isNotificationVisible) {
				this.setState({
					isNotificationVisible: notification.visible
				})
			}
		})
	}

	render() {
		return (
			<div>
				{ this.state.isNotificationVisible && (
					<PopUp content={{
						...this.props.store.notification.getContentJSON(),
						actions: this.props.store.notification.actionsData,
						close: () => this.props.store.notification.close()
					}}/>
				)}
			</div>
		)
	}
}

export default GlobalNotification
