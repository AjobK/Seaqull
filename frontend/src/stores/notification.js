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
        description: types.optional(types.string, ''),
        actionsData: types.optional(types.array(Action), []),
    })
    .volatile(self => ({
        customClose: types.optional(functionType, null)
    }))
    .actions(self => ({
        setContent(content) {
            self.visible = true
            self.title = content.title
            self.description = content.description
        },
        setActions(actions) {
            self.actionsData = actions
        },
        setCustomClose(customClose) {
            self.customClose = customClose
        },
        getTitleAndDescriptionJSON() {
            return {
                title: self.title,
                description: self.description
            }
        },
        close() {
            if (self.customClose instanceof Function) {
                self.customClose()
            }

            self.visible = false
            self.title = ''
            self.description = ''
            self.actionsData = []
            self.customClose = null
        },
    }))

export default NotificationStore
