import React, { Component } from 'react'
import styles from './userBanner.scss'
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class UserBanner extends Component {
	render() {
		const { user } = this.props.store

		let fontSize = ''

		if (user.name.length > 30) {
			fontSize = styles.nameSmall
		} else if (user.name.length > 20) {
			fontSize = styles.nameMedium
		} else if (user.name.length > 10) {
			fontSize = styles.nameLarge
		}

		return (
			<section className={styles.wrapper}>
				<div className={styles.innerWrapper}>
					<div className={styles.picture} style={{backgroundImage: `url(${user.picture})` }} />
					<div className={styles.info}>
						<h2 className={[styles.name, fontSize].join(' ')}>{ user.name || ''}</h2>
						<div className={styles.achieved}>
							<span className={styles.level}>{ user.level || ''}</span>
							<h3 className={styles.role}>{ user.role || ''}</h3>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default UserBanner
