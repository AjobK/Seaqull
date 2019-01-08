import React, { Component } from 'react'
import { Header, Main } from '../layouts'
import styles from './App.scss'
import Popup from '../components/popup'

class App extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <Header />
                <Main />
                <Popup >
                    <h1>test</h1>
                </Popup>
            </div>
        )
    }
}

export default App;
