import React, { Component } from 'react';
import Header from '../components/home/header'
import Main from '../components/home/main'

import '../pages/App.scss';

class App extends Component {
    render() {
        return (
        <div className="wrapper">
            <Header />
            <Main />
        </div>
        );
    }
}

export default App;