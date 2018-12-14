import React, { Component } from 'react'
import { Header, Main } from '../layouts'
import styles from './App.scss'

class App extends Component {
    render() {
        return (
            <>
                <Header />
                <div className={styles.wrapper}>
                    <Main />
                </div>
            </>
        )
    }
}

export default App;
