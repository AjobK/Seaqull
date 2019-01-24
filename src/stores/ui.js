import { types } from 'mobx-state-tree'

const UIStore = types
	.model('UIStore', {
		subNavOpen: types.optional(types.boolean, false),
		currentOpenTab: types.optional(types.string, 'home')
	})
	.actions(self => ({
		reset() {
			self.subNavOpen = false
			self.currentOpenTab = 'home'
		},
		closeSubNav() {
			self.subNavOpen = false
		},
		toggleSubNav() {
			self.subNavOpen = !self.subNavOpen
		},
		setCurrentOpenTab(arg) {
			self.currentOpenTab = arg
		}
	}))
	.views(() => ({
		hasScroll() {
			return document.body.offsetHeight < window.offsetHeight
		},
	}))

export default UIStore
