import React from 'react'
import styles from './contact.scss'

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

const Contact = (props) => <article style={{backgroundColor: rgb}} className={[gridClass, styles.contact].join(' ')}>
  <div className={styles.title}>{ props.name }</div>
  {/* <div>{ props.email }</div>
  <div>{ props.phone }</div>
  <div>{ props.address } { props.suite }</div>
  <div>{ props.city } { props.state }, { props.zip }</div> */}
</article>

export default Contact