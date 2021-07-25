import React, { Component } from 'react'
import styles from './postViews.scss'
import Axios from 'axios'
import { Icon } from '../../components'

class PostViews extends Component {
    constructor(props) {
        super(props)
        this.state = { views: 0 }
    }

    loadViews() {
        const path = window.location.pathname.split('/').filter(i => i != '').pop()
        const url = `http://localhost:8000/api/post/view/${path}`

        Axios.get(url).then((response) => {
            this.setState({ views: response.data.views })
        }).catch((err) => {
            //TODO: handle error
            console.log(err)
        })
    }

    componentDidMount() {
        this.loadViews()
    }

    render() {
        return (
            //TODO: add icon
            <div className={ styles.postViews }>
                {/* <p className={ styles.postViewsText }>{ this.state.views } { this.state.views === 1 ? 'view' : 'views' }</p> */}
                <p className={ styles.postViewsText }>
                    { this.state.views } <Icon iconName={'Eye'} className={styles.viewIcon} />
                </p>
            </div>
        )
    }
}

export default PostViews