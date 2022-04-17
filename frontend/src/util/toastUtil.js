import { toast } from 'react-hot-toast'

class ToastUtil {
  static createToast(toastContent) {
    toast(
      JSON.stringify(toastContent),
      { duration: toastContent.duration }
    )
  }
}

export default ToastUtil
