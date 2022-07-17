const types = {
  success: {
    type: 'success',
    icon: 'Check',
    duration: 2000
  },
  error: {
    type: 'error',
    icon: 'ExclamationCircle',
    duration: 4000
  },
  warning: {
    type: 'warning',
    icon: 'ExclamationTriangle',
    duration: 4000
  },
  info: {
    type: 'info',
    icon: 'ExclamationCircle',
    duration: 4000
  }
}

export const toastData = {
  types,
  messages: {
    avatarUpdateSuccess: {
      ...types.success,
      title: 'Avatar updated',
      description: 'Your avatar has been successfully updated.'
    },
    avatarUpdateError: {
      ...types.error,
      title: 'Avatar could not be updated',
      description: 'An error occurred while updating your avatar.'
    },
    prototypeNotification: {
      ...types.info,
      title: 'Info',
      description: 'This project is meant as a prototype, not as a production-grade application. ' +
      'Please refrain from storing any sensitive information.',
      duration: Infinity
    },
    exampleWarning: {
      ...types.warning,
      title: 'This is an example warning.',
      description: 'Lorem ipsum dolor sit amet'
    },
    spamWarning: {
      ...types.error,
      title: 'Please wait before posting again.',
      description: 'You have recently made a post and have to wait before posting another.'
    },
  }
}
