import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './headerNavigation.scss'
import { Link } from 'react-router-dom'
import { Button } from '../../components'

@inject('store') @observer
class HeaderNavigation extends Component {
  render() {
    const { user, profile } = this.props.store

    return (
      <nav className={styles.menu}>
        {profile.loggedIn ? ( // Logged in content
          <ul className={styles.menuUl}>
            <Link to='/profile' className={styles.menuItem}>
              <li>My profile</li>
            </Link>
            <li onClick={user.logOut} className={styles.menuItem}>Logout</li>
          </ul>
        ) : ( // Logged out content
          <ul className={styles.menuUl}>
            <Link to='/login' className={styles.menuItem}>
              <li>Log in</li>
            </Link>
            <Link to='/register'>
              <Button value='Sign Up' className={styles.button} />
            </Link>
          </ul>
        )}
      </nav>
    )
  }
}

export default HeaderNavigation
