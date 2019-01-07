import React, { Component } from 'react'
import styles from './main.scss'
import generateRandomWord from 'random-words'

class Main extends Component {
    createDummyGrid = () => {
        let x = []
        for (let i = 0; i < 30; i++) {
            // Converting RGB to hexcode since some browsers don't support rgb
            let color = {
                r: Math.floor(Math.random() * 255).toString(16),
                g: Math.floor(Math.random() * 255).toString(16),
                b: Math.floor(Math.random() * 255).toString(16)
            }
            
            let bg = [
                '#',
                color.r.length > 2 ? '0' + color.r : color.r,
                color.g.length > 2 ? '0' + color.g : color.g,
                color.b.length > 2 ? '0' + color.b : color.b
            ].join('')

            x.push(<div key={i} className={styles.dummyBlock} style={{
                backgroundColor: bg
            }}><p>{generateRandomWord(3).join(' ')}</p></div>)
        }
        return x
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
