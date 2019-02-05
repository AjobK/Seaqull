import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './nav.scss'
import { ProfileBar, NavDropdown } from '../../components'

@inject('store') @observer
class NavigationMobile extends Component {
  componentDidMount() {
    const { nav } = this.props.store

    this.setState({
      menuItems: nav.menuItems
    })
  }

  render() {
    const { ui, nav, user } = this.props.store

<<<<<<< HEAD
    const menuItems = user.loggedIn ? nav.menuItemsLoggedIn : nav.menuItemsLoggedOut

    return (
      <section className={[
        styles.navigation,
        ui.subNavOpen && styles.sNavOpen,
        this.props.filler && styles.filler
      ].join(' ')}>
        {!this.props.filler &&
          <div className={styles.menu}>
            {user.loggedIn && <ProfileBar userName={user.name} userRole={user.role} levelPercentage={user.percentage} level={user.level} />}
            <ul className={styles.menuUl}>
              {Object.keys(menuItems).map((item, index) => (
                <NavDropdown
                  title={item}
                  icon={menuItems[item].icon}
                  key={index}
                  value={menuItems[item].children
                  } />
              ))}
            </ul>
          </div>}
      </section>
    )
  }
=======
		let arr = []
		for (var key in menuItems) {
			if (menuItems.hasOwnProperty(key)) {
				arr.push(
					<NavDropdown
						title={key}
						icon={menuItems[key].icon}
						key={Math.random()}
						value={menuItems[key].children
					} />
				)
			}
		}

		return (
			<section className={[
				styles.navigation,
				ui.subNavOpen && styles.sNavOpen,
				this.props.filler && styles.filler
			].join(' ')}>
				{!this.props.filler &&
				<div className={styles.menu}>
					{user.loggedIn && <ProfileBar userName={user.name} userRole={user.role} levelPercentage={user.percentage} level={user.level} />}
					<ul className={styles.menuUl}>
						{arr}
					</ul>
				</div>}
			</section>
		)
	}
>>>>>>> f4f3d4d5bd2edd33a7b1a61e4d94aa215e5b887b
}

export default NavigationMobile
