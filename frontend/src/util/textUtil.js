class TextUtil {
    // REF: 
    // https://www.freecodecamp.org/news/how-to-more-accurately-estimate-read-time-for-medium-articles-in-javascript-fb563ff0282a/

    static WORDS_PER_MIN = 265

    static getReadTimeFromText(text) {
        return this.getHumanizedReadingTimeFromText(this.getCalculatedWordReadTimeFromText(text))
    }

    static getHumanizedReadingTimeFromText(wordTime) {
        if (wordTime < 0.5) {
            return 'less than a minute'
        }

        if (time >= 0.5 && time < 1.5) {
            return '1 minute'
        }

        return `${ Math.ceil(time) } minutes`
    }

    static getCalculatedWordReadTimeFromText(text, wordsPerMin = this.WORDS_PER_MIN) {
        const wordCount = this.getWordCountFromText(text)
        const wordTime = wordCount / wordsPerMin
        
        return wordTime
    }

    static getWordCountFromText(text) {
        this.getTrimmedText(text)

        const pattern = '\\w+'
        const reg = new RegExp(pattern, 'g')

        return (text.match(reg) || []).length
    }

    static getTrimmedText(text) {
        return text.replace(/^\s+/, '').replace(/\s+$/, '')
    }
}

export default TextUtil