import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../stores'
import { Header, Navigation, NavigationMobile, Main } from '../layouts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import styles from './App.scss'

class App extends Component {
    constructor (props) {
        super(props)
        this.store = initStore(true)
        library.add(faCaretDown)
        library.add(faCaretUp)
    }

    componentDidMount() {
        document.querySelector(`.${styles.lowerOrder}`).addEventListener('mousedown', this.preventXScroll);
    }

    preventXScroll = (e) => {
        const { ui } = this.store
        if (e.which == 2 && ui.subNavOpen) e.preventDefault()
    }

    render() {
        return (
            <Provider store={this.store}>
                <section className={styles.wrapper}>
                    <aside className={styles.higherOrder}>
                        <Header />
                        <NavigationMobile />
                    </aside>
                    <main className={styles.lowerOrder}>
                        <Header filler /> {/* Filler aligns content */}
                        <Navigation />
                        <NavigationMobile filler /> {/* Filler aligns content */}
                        <Main />
                    </main>
                </section>
            </Provider>
        )
    }
}

export default App
