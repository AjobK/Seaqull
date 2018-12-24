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
                <div className={styles.app}>
                    <Header />
                    <div className={styles.wrapper}>
                        {/* <SideNavigation /> */}
                        <div className={styles.wrapperSideNavigation}>
                            <SideNavigation filler />
                        </div>
                        <div className={styles.wrapperContent}>
                            <Header filler /> {/* Filler aligns content */}
                            <Main />
                        </div>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;
