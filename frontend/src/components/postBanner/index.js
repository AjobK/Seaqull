import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon } from '..'
import { Link } from 'react-router-dom'
import ColorUtil from '../../util/colorUtil'

@inject('store') @observer
class PostBanner extends Component {
  render() {
    const { author, isOwner } = this.props
    const uniqueAvatarColorBasedOnHash = ColorUtil.getUniqueColorBasedOnString(author.name)

    return (
      <section className={`${ styles.wrapper} ${isOwner ? styles.owner : ''}` }>
        <div
          className={ styles.background}
          style={{ backgroundImage: `url(${ author.bannerURL })` }} />
        { false && this.props.isOwner && // TODO: Remove 'false && ' and make it possible to change post banner
          <div className={ styles.wrapperEditContainer }>
            <span className={ styles.wrapperEdit }>
              <span className={ styles.wrapperEditContent }>Click to edit</span> <Icon iconName={'Pen'} />
            </span>
          </div>
        }
        <div className={ styles.backdrop}/>
        <div className={ styles.innerWrapper }>
          <div className={ styles.info }>
            <Link to={`/profile/${author.name}`} className={ styles.profileLink }>
              <div className={ styles.infoInner }>
                <div className={ styles.picture} style={{ backgroundImage: `url(${author.avatarURL || ''})`, backgroundColor: uniqueAvatarColorBasedOnHash }} />
                <div className={ styles.user_info }>
                  <h2 className={ [styles.name].join(' ') }>{ author.name || ''}</h2>
                  <div className={ styles.achieved }>
                    <h3 className={ styles.role }>{ author.title || ''}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default PostBanner
