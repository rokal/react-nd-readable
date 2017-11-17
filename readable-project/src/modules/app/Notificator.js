import {toastr} from 'react-redux-toastr'

import NotificationTypes from './notificationTypes'

export const notify = (notification) => {
  switch (notification.type) {
    case NotificationTypes.SUCCESS:
      return toastr.success(notification.title, notification.message)
    case NotificationTypes.WARNING:
      return toastr.warning(notification.title, notification.message)
    case NotificationTypes.ERROR:
      return toastr.error(notification.title, notification.message)
    default:
      throw new Error(`Unsupported notificationtype: ${notification.type}`)
  }
}

