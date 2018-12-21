import { types, applySnapshot } from 'mobx-state-tree'
import TestStore from './test'

let store = null

const Store = types
  .model('Store', {
    test: types.optional(TestStore, {})
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
