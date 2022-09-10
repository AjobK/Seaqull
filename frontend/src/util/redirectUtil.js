class RedirectUtil {
  static setRedirectPath(path) {
    sessionStorage.setItem('redirectPath', path)
  }

  static getRedirectPath() {
    return sessionStorage.getItem('redirectPath')
  }

  static undoRedirectPath() {
    sessionStorage.setItem('redirectPath', '')
  }
}

export default RedirectUtil
