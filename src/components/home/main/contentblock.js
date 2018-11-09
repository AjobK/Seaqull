import React, { Component } from 'react'
import styles from './contentblock.scss'

class ContentBlock extends Component {
    constructor(props) {
        super(props)
    }

    render() {       
        let randomRGB = {
            red:    Math.random() * 255,
            green:  Math.random() * 255,
            blue:   Math.random() * 255
        };
        let gridElOptions = [
            ["sm-block-size"],
            ["md-block-size"],
            ["lg-block-size"],
            ["xl-block-size"],
        ];
        
        const { red, green, blue } = randomRGB
        const rgb = `rgb(${red},${green},${blue})`
        const gridClass = gridElOptions[Math.floor(Math.random() * gridElOptions.length - 1)]

        return (
            <article style={{backgroundColor: rgb}} className={[gridClass, styles.block].join(' ')}> Article </article>
        )
    }
}

export default ContentBlock