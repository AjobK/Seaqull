import React from 'react'
import App from '../'
import { Header, Main } from '../../layouts'
import { Navigation, NavigationMobile } from '../../components'
import styles from './../Home.scss'

class Home extends App {
	constructor(props) {
		super(props)
		this.state = {
			hasScroll: false
		}
	}

	componentDidMount() {
		this.setState({ hasScroll: document.body.offsetHeight > window.innerHeight })
	}

	render() {
		const { hasScroll } = this.state

		return (
			<section className={styles.wrapper}>
				<Header />
				<aside className={[styles.higherOrder, hasScroll && styles.hasScroll].join(' ')}>
					<Navigation />
					<NavigationMobile />
				</aside>
				<NavigationMobile filler /> {/* Filler aligns content */}
				<Navigation filler /> {/* Filler aligns content */}
				<Main />
			</section>
		)
	}
}

export default Home
