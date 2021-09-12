class URLUtil {
  static getPathArguments () {
    const path = window.location.pathname.split('/')

    return path
  }

  static getLastPathArgument () {
    const path = this.getPathArguments().filter(i => i != '').pop()

    return path
  }
}

export default URLUtil
