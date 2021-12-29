import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard } from '../../layouts'
import { withRouter } from 'react-router-dom'
import styles from './post.scss'

@inject('store')
@observer
class PostNew extends App {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount = () => {
  }

  render = () => {
    return (
      <Standard>
        <section className={ styles.postContent }>
          <h1 className={ styles.postContentTitle }>
            The Seaqull Resource Library, with some extra words
          </h1>
          <p className={ styles.postContentDescription }>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>
      </Standard>
    )
  }
}

export default withRouter(PostNew)
