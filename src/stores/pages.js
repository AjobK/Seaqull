import { types } from 'mobx-state-tree'
import homepage from '../../data/homePage.json'
import aboutpage from '../../data/aboutPage.json'

const searchModelByModelTitle = (pageModel, query) => {
  const fields = pageModel.fields
  if (fields) {
    let foundModel
    Object.keys(fields).forEach(key => {
      if (Array.isArray(fields[key])) {
        fields[key].forEach(model => {
          let searchedModel = searchModelByModelTitle(model, query)
          if (searchedModel) {
            foundModel = searchedModel
          }
        })
      }
    })
    if (foundModel) return foundModel
    if (fields.modelTitle === query) return pageModel
  }
}

let defaults = {
  title: 'Pages-Store',
  pagesArray: [],
  currentPage: '',
  subNavigations: {
    'about': {
      'link': 'about',
      'subLinks': [
        { 'text': 'About FTSF', 'href': 'ftsf' },
        { 'text': 'Board', 'href': 'board' },
        { 'text': 'History', 'href': 'history' },
        { 'text': 'Future', 'href': 'future' },
        { 'text': 'Partners & Members', 'href': 'partners-members' },
        { 'text': 'Sustainable Development Goals', 'href': 'goals', 'notNested': true }
      ]
    },
    'cases': {
      'link': 'cases',
      'subLinks': null
    },
    'publications': {
      'link': 'publications',
      'subLinks': [
        { 'text': 'Updates', 'href': 'update' },
        { 'text': 'Research & Papers', 'href': 'research' },
        { 'text': 'Press Centre', 'href': 'press-centre' }
      ]
    },
    'events': {
      'link': 'events',
      'subLinks': null
    },
    'shop': {
      'link': 'shop',
      'icon': 'faShoppingBag',
      'subLinks': null
    },
    'contact': {
      'link': 'contact',
      'subLinks': null
    }
  }
}

const returnSubs = () => ({
  'about': [
    { 'text': 'About FTSF', 'href': 'ftsf' },
    { 'text': 'Board', 'href': 'board' },
    { 'text': 'History', 'href': 'history' },
    { 'text': 'Future', 'href': 'future' },
    { 'text': 'Partners & Members', 'href': 'partners-members' },
    { 'text': 'Sustainable Development Goals', 'href': 'goals', 'notNested': true }
  ],
  'publications': [
    { 'text': 'Updates', 'href': 'update' },
    { 'text': 'Research & Papers', 'href': 'research' },
    { 'text': 'Press Centre', 'href': 'press-centre' }
  ]
})

const PagesStore = types
  .model('PagesStore', {
    pagesArray: types.optional(types.array(types.frozen({ subtype: [types.string, types.number, types.array(types.number)] })), defaults.pagesArray),
    currentPage: types.optional(types.string, defaults.currentPage),
    subNavigations: types.optional(types.frozen({ subtype: [types.array(types.frozen({ subtype: [types.string] }))] }), defaults.subNavigations)
  })
  .actions(self => ({
    reset () {
      self.pagesArray = defaults.pagesArray
      self.currentPage = defaults.currentPage
      self.subNavigations = defaults.subNavigations
    },
    setPages (pathname) {
      self.currentPage = pathname
      let seperatedPath = pathname.split('/')
      let currentPath = seperatedPath[1]
      let fillingArray
      let belongsTo = null
      switch (currentPath) {
        case 'about':
          fillingArray = returnSubs().about
          break
        case 'publications':
          fillingArray = returnSubs().publications
          break
        case 'goals':
          fillingArray = returnSubs().about
          belongsTo = 'about'
          break
        default:
          fillingArray = self.pagesArray
          break
      }

      // Turn into second-level urls
      self.pagesArray = fillingArray.map((item) => {
        item.href = item.notNested ? `/${item.href}` : `/${belongsTo || currentPath}/${item.href}`
        if (item.href === pathname) item.active = true
        return item
      })
    }
  }))
  .views(self => ({
    searchModel (query) {
      let page = homepage
      switch (self.currentPage) {
        case '/':
          page = homepage
          break
        case '/about':
          page = aboutpage
          break
      }

      let foundModel
      page.modules.forEach(pageModel => {
        let searchedModel = searchModelByModelTitle(pageModel, query)
        if (searchedModel) {
          foundModel = searchedModel
        }
      })
      return foundModel ? foundModel.fields : 'undefined'
    }
  }))

export default PagesStore
