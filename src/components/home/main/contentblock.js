import React, { Component } from 'react'
import styles from './main.scss'

class ContentBlock extends Component {
    constructor() {
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
        this.rgb = `rgb(${red},${green},${blue})`
        this.gridClass = gridElOptions[Math.floor(Math.random() * gridElOptions.length - 1)]
    }

    render() {
        return (
            <article style={this.rgb} className={this.gridClass} />
        )
    }
}

export default ContentBlock