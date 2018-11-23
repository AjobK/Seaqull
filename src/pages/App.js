import React, { Component } from 'react';
import styles from '../layouts/main/contentblock.scss';
import Header from '../layouts/header'
import ContentBlock from '../layouts/main/contentblock'

class App extends Component {
    render() {
        return (
        <>
        <div>
            <Header />
            <ContentBlock className={styles.block} />
        </div>
        </>
        );
    }
}

export default App;
