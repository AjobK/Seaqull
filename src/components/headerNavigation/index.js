import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './headerNavigation.scss'
import { Button } from '../../components'

@inject('store') @observer
class HeaderNavigation extends Component {
	render() {
		const { user } = this.props.store

		return (
			<nav className={styles.menu}>
				{user.loggedIn ? ( // Logged in content
					<ul className={styles.menuUl}>
						<li className={styles.menuItem}>My profile</li>
						<li className={styles.menuItem} onClick={user.logOut}>Logout</li>
					</ul>
				) : ( // Logged out content
					<ul className={styles.menuUl}>
						<li className={styles.menuItem} onClick={user.logIn}>Log in</li>
						<Button value='Sign Up' className={styles.button} />
					</ul>
				)}
			</nav>
		)
	}
}

export default HeaderNavigation
