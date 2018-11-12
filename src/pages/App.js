import React, { Component } from 'react';
import styles from './App.scss';
import Header from '../components/home/header'

class App extends Component {
    render() {
        return (
        <>
            <Header />
            <h3 className={styles.testb}>Setup_v2 Branch Is working!</h3>
        </>
        );
    }
}

export default App;