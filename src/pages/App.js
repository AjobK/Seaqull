import React, { Component } from 'react'
import { Header, Main } from '../layouts'
import styles from './App.scss'

class App extends Component {
    render() {
        return (
            <>
                <Header />
                <div className={styles.wrapper}>
                    {/* This filler makes sure the content is aligned correctly   */}
                    <Header filler />
                    <Main />
                </div>
            </>
        )
    }
}

export default App;
