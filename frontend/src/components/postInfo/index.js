import React, { Component } from 'react'
import styles from './postInfo.scss'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { DraftJsUtil, TextUtil, TimeUtil } from '../../util/'
import { Icon, PostViews } from '../index'

@inject('store')
@observer
class PostInfo extends Component {
  constructor(props) {
    super(props)
  }

  getTypeStyles = () => {
    let { theme, size, minimizeOnMobile } = this.props

    const typeStyles = []

    if (!theme) theme = 'light'
    typeStyles.push(this.generateTypeStyle(theme))

    if (!size) size = 'small'
    typeStyles.push(this.generateTypeStyle(size))

    if (minimizeOnMobile)
      typeStyles.push(this.generateTypeStyle('minimizeOnMobile'))

    return typeStyles
  }

  generateTypeStyle = (typeValue) => {
    return styles[`postInfo${ typeValue.charAt(0).toUpperCase() + typeValue.slice(1) }`]
  }

  render() {
    const { post, withViews } = this.props

    const getPostReadTime = () => {
      let content

      if (post.content.blocks) {
        content = DraftJsUtil.getRawContentFromData(post.content)
      } else {
        try {
          content = post.content.getPlainText()
        } catch (e) {
          content = post.content
        }
      }

      return TextUtil.getReadTimeFromText(content)
    }

    return (
      <div className={ `${ styles.postInfo } ${ this.getTypeStyles().join(' ') }` }>
        <div className={ `${ styles.postInfoSection } ${ styles.postInfoCategoryWrapper }` }>
          <Link to={ '#' } className={ styles.postInfoCategory }>
            <span className={ styles.postInfoCategoryBullet }>
              <Icon iconName={ 'Circle' } />
            </span>
            <p>
              Machine learning
              <span>{/* UNDERLINE */}</span>
            </p>
          </Link>
          <span className={ styles.postInfoBullet }>&bull;</span>
        </div>
        <div className={ styles.postInfoSection }>
          { withViews && (
            <div className={ styles.postInfoViews }>
              <PostViews />
              <span className={ styles.postInfoBullet }>&bull;</span>
            </div>
          ) }
          <div className={ styles.postInfoText }>
            <span className={ styles.postInfoTextIcon }>
              <Icon iconName={ 'Stopwatch' } />
            </span>
            <p>
              { getPostReadTime() }
            </p>
          </div>
          <span className={ styles.postInfoBullet }>&bull;</span>
          <div className={ styles.postInfoText }>
            <p>{ TimeUtil.timeAgo(new Date(post.created_at)) }</p>
          </div>
        </div>
      </div>
    )
  }
}

export default PostInfo
