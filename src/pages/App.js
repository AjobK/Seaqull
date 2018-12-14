import React, { Component } from 'react'
import { Header, Main } from '../layouts'
import styles from './App.scss'

class App extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <Header />
                <Main />
            </div>
        )
    }
}

export default App;
