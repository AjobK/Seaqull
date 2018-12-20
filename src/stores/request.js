import { types } from 'mobx-state-tree'
import { toJS } from 'mobx'
import { fromPromise, PENDING, FULFILLED, REJECTED } from 'mobx-utils'

export default types
  .model('Request', {
    response: types.optional(types.frozen, { state: FULFILLED, value: undefined })
  })
  .views(self => ({
    get state () {
      return self.response.state
    },
    get value () {
      return self.state === FULFILLED ? toJS(self.response.value) : undefined
    },
    get error () {
      return self.state === REJECTED
    },
    get message () {
      return self.error ? self.response.value.message : undefined
    },
    get loading () {
      return self.state === PENDING
    }
  }))
  .actions(self => ({
    fetch (promise) { self.response = fromPromise(promise) }
  }))
