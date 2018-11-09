import React, { Component } from 'react'
import styles from './main.scss'

class Main extends Component {
    render() {
        return (
            <main className={styles.main}>
                <section className={styles.highlighted}>
                    Hello
                </section>
                <section className={styles.viewing}>
                    Bye
                </section>
            </main>
        )
    }
}

export default Main