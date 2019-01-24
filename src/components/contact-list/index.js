import React from 'react'
import fetch from 'isomorphic-fetch'
import Contact from './contact'

class ContactList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: [],
      per: 2,
      page: 1,
      totalPages: null,
    }
  }
  
  loadContacts = () => {
      const { per, page, contacts } = this.state
      const url = 'https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page={page}'
      fetch(url)
      .then(response => response.json())
      .then(json => this.setState({
        contacts: [...contacts, ...json.contacts]
      }))
  }

  componentWillMount() {
    this.loadContacts()
  }


  loadMore = () => {
      this.setState(prevState => ({
          page: prevState.page + 1,
      }), this.loadContacts)
  }

  render() {
    return <div>
        <ul className="contacts">
      {
        this.state.contacts.map(contact => <li key={contact.id}>
          <Contact {...contact} />
        </li>)
      }
    </ul>
    <a onClick={this.loadMore}>Load more</a>
    </div>
  }
}

export default ContactList