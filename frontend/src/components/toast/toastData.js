const types = {
  success: {
    name: 'success',
    icon: 'Check'
  },
  error: {
    name: 'error',
    icon: 'ExclamationCircle'
  },
  warning: {
    name: 'warning',
    icon: 'ExclamationTriangle'
  },
  general: {
    name: 'general'
  }
}

export const toastData = {
  types,
  messages: {
    avatarUpdateSuccess: {
      title: 'Avatar updated',
      description: 'Your avatar has been successfully updated.',
      type: types.success.name
    },
    avatarUpdateError: {
      title: 'Avatar could not be updated',
      description: 'An error occurred while updating your avatar.',
      type: types.error.name
    },
    prototypeNotification: {
      description: 'Seaqull is currently still a work in progress, so be aware that certain features may not be ' +
        'finished yet. Let us know what you think!',
      type: types.general.name
    }
  }
}
