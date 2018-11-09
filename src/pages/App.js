import React, { Component } from "react";

import '../pages/App.scss';

class App extends Component {
    render() {
        return (
        <div class="wrapper">
            <header class="header">
                <h1 class="header__logo">Athena</h1>
                <nav class="header__menu">
                    <ul class="header__menu-ul">
                        <li class="header__menu-link">Log in</li>
                        <li class="header__menu-link__signup">Sign up</li>
                    </ul>
                </nav>
            </header>
            <main class="main">
                <section class="main__highlighted">
                </section>
                <section class="main__viewing">
                </section>
            </main>
        </div>
        );
    }
}

export default App;