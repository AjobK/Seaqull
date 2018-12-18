import React, { Component, Fragment } from 'react'
import { Header, SideNavigation, Main } from '../layouts'
import styles from './App.scss'

class App extends Component {
    render() {
        return (
            <Fragment>
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
            </Fragment>
        )
    }
}

export default App;
