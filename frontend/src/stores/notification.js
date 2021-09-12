import { types } from 'mobx-state-tree'
import { functionType } from './customTypes/functionType'

const Action = types.model({
  title: types.optional(types.string, ''),
  icon: types.optional(types.string, ''),
  primary: types.optional(types.boolean, false),
  action: types.optional(functionType, null)
})

const NotificationStore = types
  .model('UserStore', {
    visible: types.optional(types.boolean, false),
    title: types.optional(types.string, ''),
    titleIcon: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    actionsData: types.optional(types.array(Action), []),
    canCloseWithClick: types.optional(types.boolean, true)
  })
  .volatile(() => ({
    customClose: types.optional(functionType, null)
  }))
  .actions(self => ({
    setContent(content) {
      self.visible = true
      self.title = content.title
      self.titleIcon = content.titleIcon
      self.description = content.description
    },
    setActions(actions) {
      self.actionsData = actions
    },
    setCustomClose(customClose) {
      self.customClose = customClose
    },
    getContentJSON() {
      return {
        title: self.title,
        titleIcon: self.titleIcon,
        description: self.description
      }
    },
    setCanCloseWithClick(canCloseWithClick) {
      self.canCloseWithClick = canCloseWithClick
    },
    close() {
      if (self.customClose instanceof Function) {
        self.customClose()
      }

      self.visible = false
      self.title = ''
      self.titleIcon = ''
      self.description = ''
      self.actionsData = []
      self.canCloseWithClick = true
      self.customClose = null
    },
  }))

export default NotificationStore
