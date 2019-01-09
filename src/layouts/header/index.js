import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './header.scss'
import { Hamburger, HeaderNavigation } from '../../components'

@inject('store') @observer
class Header extends Component {
	hamburgerClick() {
		const { ui } = this.props.store
		ui.toggleSubNav()
	}

	render() {
		const { ui, defaultData } = this.props.store
		const { desktop, mobile } = this.props

		let headerContent = (
			<section className={styles.headerContent}>
				<Hamburger onClick={this.hamburgerClick.bind(this)} active={ui.subNavOpen} className={styles.hamburger} />
				<h1 className={styles.logo}>{defaultData.projectName}</h1>
				<HeaderNavigation />
			</section>
		)

		return desktop && (
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
