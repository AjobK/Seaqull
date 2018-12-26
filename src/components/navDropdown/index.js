import React, { Component } from 'react'
import styles from './dropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    render() {
        const { title, value, index } = this.props
        return Array.isArray(value) && (
            <li className={styles.Item} key={index}>
                <p className={styles.ItemHeading} onClick={this.toggleSubMenu}>
                    {title}
                    <FontAwesomeIcon icon="caret-down" className={styles.arrow} />
                </p>
                <ul className={[styles.ItemList, !this.state.open && styles.ItemListClosed].join(' ')}>
                    {Object.keys(value).map((subitem) => (
                        <li className={styles.ItemSub} key={subitem}>
                            <a className={styles.ItemSubLink} href={value[subitem].href}>
                                {value[subitem].title}
                            </a>
                        </li>
                    ))}
                </ul>
            </li>
        ) || (
            <li className={styles.Item} key={index}>
                <p className={styles.ItemHeading}>{title}</p>
            </li>
        )
    }
}

export default NavDropdown
