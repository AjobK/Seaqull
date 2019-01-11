import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './main.scss'
import generateRandomWord from 'random-words'

@inject('store') @observer
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
            }}><p className={styles.dummyBlockText}>{generateRandomWord(3).join(' ')}</p></div>)
        }
        return gridBlocks
    }

	componentDidMount() {
		document.querySelector(`.${styles.wrapper}`).addEventListener('mousedown', this.preventXScroll)
	}

	preventXScroll = (e) => {
        if (e.which == 2 && this.props.store.ui.subNavOpen) e.preventDefault()
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
