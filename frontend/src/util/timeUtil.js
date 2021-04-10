class TimeUtil {
    static epochs = {
        'year': 31536000,
        'month': 2592000,
        'day': 86400,
        'hour': 3600,
        'min': 60,
        'sec': 1
    }

    static getDuration = (timeAgoInSeconds) => {
        for (const epoch in this.epochs) {
            const interval = Math.floor(timeAgoInSeconds / this.epochs[epoch])
            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: epoch
                }
            }
        }
    }
    
    static timeAgo = (date) => {
        const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000)
        if(timeAgoInSeconds > 0) {
            const {interval, epoch} = this.getDuration(timeAgoInSeconds)
            const suffix = interval === 1 ? '' : 's'
            return `${interval} ${epoch}${suffix} ago`
        }
        return 'Just now'
    }
}

export default TimeUtil