import React, { Component } from 'react'
import styles from './comment.scss'

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
        return (
            <div className="comment">
                <div className="comment__body">
                    <div className="comment__main">
                        <div className="comment__header">
                            <div className="comment__header--author">
                                {this.props.comment.user.display_name}
                            </div>
                            <div className="comment__header--published-time">
                                {this.timeAgo(new Date(this.props.comment.created_at))}
                            </div>
                        </div>
                        <div className="comment__content">
                            {this.props.comment.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment