import React from 'react'
import styles from './posts.scss'

let randomRGB = {
	red: Math.random() * 255,
	green: Math.random() * 255,
	blue: Math.random() * 255
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

const Posts = (props) => <article style={{backgroundColor: rgb}} className={[gridClass, styles.contact].join(' ')}>
  <div className={styles.contactText}>{ props.name }</div>
</article>

export default Posts
