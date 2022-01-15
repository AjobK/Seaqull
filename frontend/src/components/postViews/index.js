import React, { Component } from 'react'
import styles from './postViews.scss'
import Axios from 'axios'
import { Icon } from '../../components'
import { URLUtil, UnitFormatterUtil, StyleUtil } from '../../util/'

class PostViews extends Component {
  constructor(props) {
    super(props)
    this.state = { views: 0 }
  }

  loadViews() {
    const path = URLUtil.getLastPathArgument()
    const url = `http://localhost:8000/api/post/view/${path}`

    Axios.get(url)
      .then((response) => {
        this.setState({ views: response.data.views })
      })
      .catch((err) => {
        //TODO: handle error
        console.log(err)
      })
  }

  generateTypeStyle = (typeValue) => {
    return styles[
      StyleUtil.generateStyleString('postViews', typeValue)
    ]
  }

  getTypeStyles = () => {
    let { size } = this.props

    const typeStyles = []

    if (!size) size = 'small'

    typeStyles.push(
      this.generateTypeStyle(size)
    )

    return typeStyles
  }

  componentDidMount() {
    this.loadViews()
  }

  render() {
    return (
      <div className={ `${ styles.postViews } ${ this.getTypeStyles().join(' ') }` }>
        <Icon iconName={ 'Eye' } className={ styles.viewIcon } />
        <p className={ styles.postViewsText }>
          { `
              ${ UnitFormatterUtil.getNumberSuffix(this.state.views) } 
              ${ this.state.views === 1 ? 'view' : 'views' }
          `}
        </p>
      </div>
    )
  }
}

export default PostViews
