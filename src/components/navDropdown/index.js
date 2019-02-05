import React, { Component } from 'react'
import styles from './dropdown.scss'
import { Icon } from '../../components'

class NavDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleSubMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

<<<<<<< HEAD
  render() {
    const { title, value, index, icon } = this.props

    return Array.isArray(value) && (
      <li className={styles.Item} key={index}>
        <p className={styles.ItemHeading} onClick={this.toggleSubMenu}>
          <Icon iconName={icon} className={styles.icon} />
          {title}
          <Icon iconName={this.state.open ? 'caret-up' : 'caret-down'} className={styles.arrow} />
        </p>
        <ul className={[styles.ItemList, !this.state.open && styles.ItemListClosed].join(' ')}>
          {Object.keys(value).map((subitem) => (
            <li className={styles.ItemSub} key={subitem}>
              <a className={styles.ItemSubLink} href={value[subitem].ref}>
                {value[subitem].title}
              </a>
            </li>
          ))}
        </ul>
      </li>
    ) || (
      <li className={styles.Item} key={index}>
        <p className={styles.ItemHeading}>
          <Icon iconName={icon} className={styles.icon} />
          {title}
        </p>
      </li>
    )
  }
=======
	render() {
		const { title, value, index, icon } = this.props
		let arr = []
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				arr.push(
					<li className={styles.ItemSub} key={Math.random()}>
						<a className={styles.ItemSubLink} href={value[key].ref}>
							{value[key].title}
						</a>
					</li>
				)
			}
		}
		
		return Array.isArray(value) && (
			<li className={styles.Item} key={index}>
				<p className={styles.ItemHeading} onClick={this.toggleSubMenu}>
					<Icon iconName={icon} className={styles.icon} />
					{title}
					<Icon iconName={this.state.open ? 'caret-up' : 'caret-down'} className={styles.arrow} />
				</p>
				<ul className={[styles.ItemList, !this.state.open && styles.ItemListClosed].join(' ')}>
					{arr}
				</ul>
			</li>
		) || (
			<li className={styles.Item} key={index}>
				<p className={styles.ItemHeading}>
					<Icon iconName={icon} className={styles.icon} />
					{title}
				</p>
			</li>
		)
	}
>>>>>>> f4f3d4d5bd2edd33a7b1a61e4d94aa215e5b887b
}

export default NavDropdown
