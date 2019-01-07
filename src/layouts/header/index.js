import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './header.scss'
import { Button, Hamburger } from '../../components'

@inject('store') @observer
class Header extends Component {
	hamburgerClick() {
		const { ui } = this.props.store
		ui.toggleSubNav()
	}

	render() {
		const { ui, defaultData, user } = this.props.store
		const { desktop, mobile, filler, fillerHeightOnly } = this.props
		let headerContent = (
			<section className={styles.headerContent}>
				<Hamburger onClick={this.hamburgerClick.bind(this)} active={ui.subNavOpen} className={styles.hamburger} />
				<h1 className={styles.logo}>{defaultData.projectName}</h1>
				{!user.loggedIn ? (
					<nav className={styles.menu}>
						<ul className={styles.menuUl}>
							<li className={styles.menuItem} onClick={user.logIn}>Log in</li>
							<Button value='Sign Up' className={styles.button} />
						</ul>
					</nav>
				) : (
						<nav className={styles.menu}>
							<ul className={styles.menuUl}>
								<li className={styles.menuItem}>My profile</li>
								<li className={styles.menuItem} onClick={user.logOut}>Logout</li>
							</ul>
						</nav>
					)}
			</section>
		)

		return filler && ( // Ensuring there is only ONE header for Google SEO
			<div className={styles.filler}>
				{headerContent}
			</div>
		) || fillerHeightOnly && (
			<div className={styles.filler}>
				{headerContent}
			</div>
		) || desktop && (
			<div className={[
				styles.hWrap,
				ui.subNavOpen && styles.sNavOpen
			].join(' ')}>
				<header className={[
					styles.header,
					desktop && styles.desktop,
					mobile && styles.mobile
				].join(' ')}>
					{headerContent}
				</header>
			</div>
		) || (
				<header className={[
					styles.header,
					desktop && styles.desktop,
					mobile && styles.mobile
				].join(' ')}>
					{headerContent}
				</header>
			)
	}
}

export default Header
