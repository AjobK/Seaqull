import { types } from 'mobx-state-tree'
import { EmailValidation } from '../lib/EmailValidation'
import data from './subscribed-emails.json'

const NewsletterStore = types
  .model('NewsletterStore', {
    email: '',
    subscribed: false,
    errorClass: false,
    message: ''
  })
  .actions(self => ({
    handleEmailChange (event) {
      self.email = event.target.value
      self.errorClass = false
    },
    handleSubscribe () {
      if (self.alreadySubscribed()) {
        self.message = '* This email is already in our system!'
        self.errorClass = true
      } else {
        if (EmailValidation(self.email)) {
          self.message = ''
          self.subscribed = true
        } else {
          self.message = '* The email is not in a correct format!'
          self.errorClass = true
        }
      }
    },
    alreadySubscribed () {
      let isSubscribed = false
      data.forEach(email => {
        if (self.email === email) {
          isSubscribed = true
        }
      })
      return isSubscribed
    },
    reloadForm () {
      self.email = ''
      self.subscribed = false
      self.errorClass = false
    }
  }))

export default NewsletterStore
