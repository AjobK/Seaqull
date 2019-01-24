import React from 'react'
import styles from './contact.scss'

const Contact = (props) => <div className={styles.contact}>
  <div>{ props.name }</div>
  {/* <div>{ props.email }</div>
  <div>{ props.phone }</div>
  <div>{ props.address } { props.suite }</div>
  <div>{ props.city } { props.state }, { props.zip }</div> */}
</div>

export default Contact