import { popUpData } from '../components/popUp/popUpData'

class NotificationUtil {
  static showLoginRedirect = (store, history) => {
    const { notification, nav } = store

    notification.setContent(popUpData.messages.loginRequired)
    notification.setActions([
      {
        ...popUpData.actions.cancel,
        action: () => { notification.close() }
      },
      {
        ...popUpData.actions.confirmWithText,
        action: () => {
          nav.setPathRedirectAfterLogin(window.location.pathname)
          notification.close()
          history.push('/login/')
        }
      }
    ])
  }
}

export default NotificationUtil
