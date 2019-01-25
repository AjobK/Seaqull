import React from 'react'
import styles from './posts.scss'


const Posts = (props) => {
	let randomRGB = {
		red: Math.random() * 255,
		green: Math.random() * 255,
		blue: Math.random() * 255
	}
	let { red, green, blue } = randomRGB
	let rgb = `rgb(${red},${green},${blue})`

	return (
		<article style={{backgroundColor: rgb}} className={styles.contact}>
			<div className={styles.contactText}>{ props.name }</div>
		</article>
	)
}

export default Posts
