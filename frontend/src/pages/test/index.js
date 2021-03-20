import React from 'react'
import App from '../App'
import styles from './test.scss'
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class Test extends App {

  constructor(props) {
    super(props)

    console.log(this.props.store)
  }

  toggle = () => {
    const { profile } = this.props.store

    profile.toggleLogin()
    console.log('Logged in: ' + profile.loggedIn)
  }

  render() {
    const { profile } = this.props.store

    return (
      <section className={styles.wrapper}>
        <h1 className={styles.title}>{this.props.title || 'TEST PAGE'}</h1>
        <p>{ profile.loggedIn ? 'Logged in!' : 'Not logged in...' }</p>
        <button onClick={this.toggle}>Toggle logged in</button>
      </section>
    )
  }
}

export default Test
