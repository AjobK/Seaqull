class TimeUtil {
    static timeAgo = (prevDate) => {
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
                return ''
        }
    }
}

export default TimeUtil