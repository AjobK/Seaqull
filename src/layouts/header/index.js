import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './header.scss'
import { Hamburger, HeaderNavigation } from '../../components'
import { Link } from 'react-router-dom'

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
				<Link to='/' className={styles.logo}>{defaultData.projectName}</Link>
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
