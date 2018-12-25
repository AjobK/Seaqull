import React, { Component } from 'react'
import styles from './dropdown.scss'

class NavDropdown extends Component {
    render() {
        const { title, value, index } = this.props
        return Array.isArray(value) && (
            <li className={styles.Item} key={index}>
                <p className={styles.ItemHeading}>{title}</p>
                <ul className={styles.ItemList}>
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
