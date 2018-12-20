import { types, applySnapshot } from 'mobx-state-tree'
import UiStore from './ui'
import SliderManager from './slider-manager'
import AuthStore from './user'
import TestStore from './test'
import FormStore from './newsletter'
import PagesStore from './pages'

let store = null

const Store = types
  .model('Store', {
    ui: types.optional(UiStore, {}),
    newsletter: types.optional(FormStore, {}),
    sliderManager: types.optional(SliderManager, {}),
    user: types.optional(AuthStore, {}),
    test: types.optional(TestStore, {}),
    pages: types.optional(PagesStore, {})
  })

export function initStore (isServer, snapshot = null) {
  if (isServer) {
    store = Store.create({})
  }
  if (store === null) {
    store = Store.create({})
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}
