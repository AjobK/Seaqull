import React, { Component } from 'react'
import styles from './main.scss'
import ContentBlock from './contentblock.js'

class Main extends Component {
    render() {
        return (
            <main className={styles.main}>
                <section className={styles.viewing}>
                    Viewing
                </section>
            </main>
        )
    }
}

export default Main