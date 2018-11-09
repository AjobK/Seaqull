import React, { Component } from 'react'
import styles from './main.scss'
import ContentBlock from './contentblock.js'

class Main extends Component {
    render() {
        let tempArr = []
        for (var i = 0; i < 20; i++) {
            tempArr.push(<ContentBlock />)
        }
        return (
            <main className={styles.main}>
                <section className={styles.viewing}>
                    {tempArr}
                </section>
            </main>
        )
    }
}

export default Main