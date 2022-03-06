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
  general: {
    type: 'general',
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
      ...types.general,
      description: 'Seaqull is currently still a work in progress, so be aware that certain features may not be ' +
        'finished yet. Let us know what you think!',
      duration: Infinity
    },
    exampleWarning: {
      ...types.warning,
      title: 'Please DO NOT buy the BTS meal if you don\'t stan them.',
      description: 'Please DO NOT buy the BTS meal if you don\'t stan them. You\'re preventing the actual BTS fans ' +
        'who have waited for months from having the BTS meal experience. Eating the sauces without understanding ' +
        'their significance is literally cultural appropriation and it\'s not okay'
    },
  }
}
