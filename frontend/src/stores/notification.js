import { types } from 'mobx-state-tree'
import { functionType } from './customTypes/functionType'

const NotificationStore = types
    .model('UserStore', {
        visible: types.optional(types.boolean, false),
        title: types.optional(types.string, ''),
        description: types.optional(types.string, ''),
        functions: types.optional(types.array(functionType), []),
        functionsTitles: types.optional(types.array(types.string), []),
    })
    .volatile(self => ({
        customClose: functionType
    }))
    .actions(self => ({
        setContent(content) {
            self.visible = true
            self.title = content.title
            self.description = content.description
        },
        setFunctions(functions) {
            self.functions = functions
        },
        getTitleAndDescriptionJSON() {
            return {
                title: self.title,
                description: self.description
            }
        },
        getFunctionsWithTitles() {

        },
        setCustomClose(customClose) {
            self.customClose = customClose
        },
        close() {
            self.customClose()

            self.visible = false
            self.title = ''
            self.description = ''
            self.functions = []
            self.functionsTitles = []
            self.customClose = null
        },
    }))

export default NotificationStore
