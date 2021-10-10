import React from 'react'
import App from '../App'
import styles from './error.scss'
import { Link } from 'react-router-dom'

class Error extends App {
  render() {
    let { title, sub, location } = this.props

    if (location && location.state) {
      title = title || location.state.title
      sub = sub || location.state.sub
    }

    return (
      <section className={ styles.wrapper }>
        <h1 className={ styles.title }>{ title || '500' }</h1>
        <h3>{ sub || 'Something went wrong' }</h3>
        <Link to='/'>Go home</Link>
      </section>
    )
  }
}

export default Error
