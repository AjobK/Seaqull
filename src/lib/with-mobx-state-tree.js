import React from 'react'
import { getSnapshot } from 'mobx-state-tree'
import { initStore } from '../stores'

export default (AppMobX) => {
  return class AppWithMobxStateTree extends React.Component {
    static async getInitialProps (appContext) {
      const isServer = !!appContext.req
      const store = initStore(isServer)
      let appProps = {}
      if (typeof AppMobX.getInitialProps === 'function') {
        appProps = await AppMobX.getInitialProps(appContext)
      }
      return {
        ...appProps,
        initialState: getSnapshot(store),
        isServer
      }
    }

    constructor (props) {
      super(props)
      this.store = initStore(true)
    }

    render () {
      return <AppMobX {...this.props} store={this.store} />
    }
  }
}
