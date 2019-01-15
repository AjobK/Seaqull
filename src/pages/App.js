import React, { Component } from 'react'
import { Header, Main } from '../layouts'
import styles from './App.scss'

class App extends Component {

    componentDidMount() {
        fetch('http://127.0.0.1:3000')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
        })
    }

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
