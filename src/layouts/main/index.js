import React, { Component } from 'react'
import styles from './main.scss'
import generateRandomWord from 'random-words'

class Main extends Component {
    createDummyGrid = () => {
        let gridBlocks = []
        for (let i = 0; i < 30; i++) {
            gridBlocks.push(<div key={i} className={styles.dummyBlock} style={{
                backgroundColor: `rgb(
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)})
                `
            }}><p>{generateRandomWord(3).join(' ')}</p></div>)
        }
        return gridBlocks
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <div className={styles.grid}>
                        {this.createDummyGrid()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
