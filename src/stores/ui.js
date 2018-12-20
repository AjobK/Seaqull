import { types } from 'mobx-state-tree'

const defaults = {
  title: 'UI-Store',
  header: true,
  footer: true,
  accountPopupIsOpen: false,
  nav: false,
  toggleSubLink: [false],
  loginPopupStatus: false,
  mobileNav: false,
  mobileNavHeight: 0
}

const UiStore = types
  .model('UiStore', {
    title: types.optional(types.string, defaults.title),
    header: types.optional(types.boolean, defaults.header),
    footer: types.optional(types.boolean, defaults.footer),
    accountPopupIsOpen: types.optional(types.boolean, defaults.accountPopupIsOpen),
    nav: types.optional(types.boolean, defaults.nav),
    toggleSubLink: types.optional(types.array(types.boolean), defaults.toggleSubLink),
    loginPopupStatus: types.optional(types.boolean, defaults.loginPopupStatus),
    mobileNav: types.optional(types.boolean, defaults.mobileNav),
    mobileNavHeight: types.optional(types.integer, defaults.mobileNavHeight)
  })
  .actions(self => ({
    reset () {
      self.title = ''
      self.header = true
      self.footer = true
      self.accountPopupIsOpen = false
      self.nav = false
      self.mobileNav = false
    },
    toggleHeader () {
      self.header = !self.header
    },
    toggleFooter () {
      self.footer = !self.footer
    },
    toggleNav () {
      self.nav = !self.nav
    },
    setTitle (title) {
      self.title = title
    },
    togglePopup () {
      self.accountPopupIsOpen = !self.accountPopupIsOpen
    },
    toggleMobileNav () {
      self.mobileNav = !self.mobileNav
    },
    showMobileNav () {
      self.mobileNav = true
    },
    hideMobileNav () {
      self.mobileNav = false
    },
    toggleSubLinks (linkName) {
      self.toggleSubLink[linkName] = !self.toggleSubLink[linkName]
    },
    toggleLoginPopup () {
      self.loginPopupStatus = !self.loginPopupStatus
    },
    showPopup () {
      self.loginPopupStatus = true
    },
    hidePopup () {
      self.loginPopupStatus = false
    },
    mobileNavHeightset (isOpen, navLinksLength) {
      self.mobileNavHeight = isOpen ? 58 * navLinksLength : 0
    }
  }))
  .views(self => ({
    navIcon () {
      return self.nav ? 'faTimes' : 'faBars'
    }
  }))

export default UiStore
