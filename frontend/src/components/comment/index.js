import React, { Component } from 'react'
import styles from './comment.scss'

import { Link } from 'react-router-dom';

import { CommentForm } from '../'

class Comment extends Component {

    //TODO: move to util
    timeAgo = (prevDate) => {
        const diff = Number(new Date()) - prevDate;
        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = day * 365;
        switch (true) {
            case diff < minute:
                const seconds = Math.round(diff / 1000);
                 return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
            case diff < hour:
                if (diff < 2 * minute)
                    return Math.round(diff / day) + ' minute ago'

                return Math.round(diff / minute) + ' minutes ago'
            case diff < day:
                if (diff < 2 * hour)
                    return Math.round(diff / day) + ' hour ago'

                return Math.round(diff / hour) + ' hours ago'
            case diff < month:
                if (diff < 2 * day)
                    return Math.round(diff / day) + ' day ago'

                return Math.round(diff / day) + ' days ago'
            case diff < year:
                if (diff < 2 * month)
                    return Math.round(diff / day) + ' month ago'

                return Math.round(diff / month) + ' months ago'
            case diff > year:
                if (diff < 2 * year)
                    return Math.round(diff / day) + ' year ago'

                return Math.round(diff / year) + ' years ago'
            default:
                return ""
        }
    }

    render() {
        if (this.props.comment) {
            return (
                <article className={styles.comment}>
                    <section className={styles.comment__body}>
                        <div className={styles.comment__avatar}>
                            {/* TODO: replace profile image */}
                            <img src={require('../../static/dummy/user/profile.jpg')} className={styles.comment__avatarPicture} />
                            {/* TODO: display level badge */}
                            <div className={styles.comment__avatarBadge}>
                                {this.props.comment.profile.experience > 0 ? this.props.comment.profile.experience/1000 : 0 }
                            </div>
                        </div>
                        <div className={styles.comment__main}>
                            <div className={styles.comment__header}>
                                <div className={styles.comment__headerAuthor}>
                                    <Link to={`/profile/${this.props.comment.profile.display_name}`}>
                                        {this.props.comment.profile.display_name}
                                    </Link>
                                </div>
                                <div className={styles.comment__headerPublishedTime}>
                                    {this.timeAgo(new Date(this.props.comment.created_at))}
                                </div>
                            </div>
                            <div className={styles.comment__content}>
                                {this.props.comment.content}
                            </div>
                        </div>
                    </section>
                    <CommentForm parent_comment={this.props.comment.id }/>
                </article>
            ) 
        }
    }
}

export default Comment