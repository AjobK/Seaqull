import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './headerNavigation.scss'
import { Link } from 'react-router-dom'
import { Button } from '../../components'
import { ColorUtil } from '../../util/'
import Icon from '../icon'

@inject('store') @observer
class HeaderNavigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  render() {
    const { profile } = this.props.store
    const { dropdownOpen } = this.state

    return (
      <nav className={ styles.menu }>
        { profile.loggedIn ? ( // Logged in content
          <ul className={ styles.menuUl }>
            <li className={ styles.avatarWrapper }>
              <Link to={ `/profile/${ profile.display_name }` } className={ styles.menuItem }>
                <img
                  src={ profile.avatarURL }
                  className={ styles.avatarWrapperImage }
                  style={ {
                    backgroundColor: ColorUtil.getUniqueColorBasedOnString(profile.display_name),
                  } }
                />
              </Link>
              <div className={ styles.avatarWrapperDropdown }>
                <Icon
                  iconName='ChevronDown'
                  className={ styles.avatarWrapperDropdownIcon }
                  onClick={ this.toggleDropdown }
                />
                <ul className={ dropdownOpen ? styles.open : '' }>
                  <li onClick={ profile.logOut } className={ styles.menuItem }>Logout</li>
                </ul>
              </div>
            </li>
            <Link to='/new-post'>
              <Button value='Create Post' />
            </Link>
          </ul>
        ) : ( // Logged out content
          <ul className={ styles.menuUl }>
            <Link to='/login' className={ styles.menuItem }>
              <li>Log in</li>
            </Link>
            <Link to='/register'>
              <Button value='Sign Up' className={ styles.button } />
            </Link>
          </ul>
        )}
      </nav>
    )
  }
}

export default HeaderNavigation
