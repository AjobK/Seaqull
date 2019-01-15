import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './header.scss'
import Popup from '../../components/popup';
import { Hamburger, HeaderNavigation } from '../../components'

@inject('store') @observer
class Header extends Component {
	hamburgerClick() {
		const { ui } = this.props.store
		ui.toggleSubNav()
	}

	render() {
		const { ui, defaultData } = this.props.store

		let headerContent = (
			<section className={styles.headerContent}>
				<Hamburger onClick={this.hamburgerClick.bind(this)} active={ui.subNavOpen} className={styles.hamburger} />
				<h1 className={styles.logo}>{defaultData.projectName}</h1>
				<HeaderNavigation />
			</section>
		)

		return (
			<div className={[
				styles.headerWrap,
				ui.subNavOpen && styles.sNavOpen
			].join(' ')}>
				<header className={[
					styles.header
				].join(' ')}>
					{headerContent}
				</header>
			</div>
		)
	}
}

export default Header
