const types = {
  success: {
    name: 'success',
    icon: 'Check',
    duration: 2000
  },
  error: {
    name: 'error',
    icon: 'ExclamationCircle',
    duration: 4000
  },
  warning: {
    name: 'warning',
    icon: 'ExclamationTriangle',
    duration: 4000
  },
  general: {
    name: 'general',
    duration: 4000
  }
}

export const toastData = {
  types,
  messages: {
    avatarUpdateSuccess: {
      title: 'Avatar updated',
      description: 'Your avatar has been successfully updated.',
      type: types.success.name,
      duration: types.success.duration
    },
    avatarUpdateError: {
      title: 'Avatar could not be updated',
      description: 'An error occurred while updating your avatar.',
      type: types.error.name,
      duration: types.error.duration
    },
    prototypeNotification: {
      description: 'Seaqull is currently still a work in progress, so be aware that certain features may not be ' +
        'finished yet. Let us know what you think!',
      type: types.general.name,
      duration: 10000
    }
  }
}
