import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../stores'
import { Header, Navigation, NavigationMobile, Main } from '../layouts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faCaretUp, faHome, faCog, faSignOutAlt, faSignInAlt, faUsers, faUser, faTh } from '@fortawesome/free-solid-svg-icons'
import styles from './App.scss'

class App extends Component {
    constructor (props) {
        super(props)
        this.store = initStore(true)
        library.add(faCaretDown)
        library.add(faCaretUp)
        library.add(faHome)
        library.add(faCog)
        library.add(faSignOutAlt)
        library.add(faSignInAlt)
        library.add(faUser)
        library.add(faUsers)
        library.add(faTh)
        this.state = {
            hasScroll: false
        }
    }

    componentDidMount() {
        document.querySelector(`.${styles.lowerOrder}`).addEventListener('mousedown', this.preventXScroll)
        this.setState({hasScroll: document.body.offsetHeight > window.innerHeight})
    }

    preventXScroll = (e) => {
        const { ui } = this.store
        if (e.which == 2 && ui.subNavOpen) e.preventDefault()
    }

    render() {
        const { hasScroll } = this.state

        return (
            <Provider store={this.store}>
                <section className={styles.wrapper}>
                    <aside className={[styles.higherOrder, hasScroll && styles.hasScroll].join(' ')}>
                        <Navigation />
                        <NavigationMobile />
                        <Header />
                    </aside>
                    <main className={styles.lowerOrder}>
                        <Navigation filler /> {/* Filler aligns content */}
                        <NavigationMobile filler /> {/* Filler aligns content */}
                        <Main />
                    </main>
                </section>
            </Provider>
        )
    }
}

export default App
