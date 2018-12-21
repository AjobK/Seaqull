import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../stores'
import { Header, SideNavigation, Main } from '../layouts'
import styles from './App.scss'

class App extends Component {
    constructor (props) {
        super(props)
        this.store = initStore(true)
    }
    render() {
        return (
            <Provider store={this.store}>
                <div className={styles.wrapper}>
                    <div className={styles.wrapperSideNavigation}>
                        <SideNavigation open />
                    </div>
                    <div className={styles.wrapperContent}>
                        <Header />
                        <Header filler /> {/* Filler aligns content */}
                        <Main />
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;
