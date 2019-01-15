import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../stores'
import { Header, Main } from '../layouts'
import { Navigation, NavigationMobile } from '../components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faCaretUp, faHome, faCog, faSignOutAlt, faSignInAlt, faUsers, faUser, faTh } from '@fortawesome/free-solid-svg-icons'
import styles from './App.scss'

class App extends Component {
	constructor(props) {
		super(props)
		this.store = initStore(true)
		library.add(faCaretDown, faCaretUp, faHome, faCog, faSignOutAlt, faSignInAlt, faUser, faUsers, faTh)
		this.state = {
			hasScroll: false
		}
	}

	componentDidMount() {
		this.setState({ hasScroll: document.body.offsetHeight > window.innerHeight })
		fetch('http://127.0.0.1:3000/test')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
        })
	}

	render() {
		const { hasScroll } = this.state

		return (
			<Provider store={this.store}>
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
			</Provider>
		)
	}
}

export default App
