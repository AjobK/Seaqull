import { types, applySnapshot } from 'mobx-state-tree'
import DefaultDataStore from './defaultData'
import UIStore from './ui'

let store = null

const Store = types
  .model('Store', {
    defaultData: types.optional(DefaultDataStore, {}),
    ui: types.optional(UIStore, {})
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
