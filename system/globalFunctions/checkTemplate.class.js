const checkUnique = require('../globalFunctions/checkUnique')

class CheckTemplate {
  /**
   * Requires each item in the template to be send in the body
   *
   * @param {Object} template
   * @param {Object} body
   */
  async create (template, body) {
    const names = Object.getOwnPropertyNames(template)

    for (let x = 0; x < names.length; x++) {
      const element = names[x]

      if (template[element].required) {
        if (!body[element]) {
          return { 'msg': 'body is not complete!' }
        }
      }

      if (template[element].unique) {
        const result = await checkUnique(template[element].unique, element, body[element])

        if (result.length > 0) {
          return { 'msg': `${element} must be unique` }
        }
      }

      if (template[element].foreign) {
        const result = await checkUnique(template[element].foreign.table, template[element].foreign.row, body[element])

        if (result.length === 0) {
          return { 'msg': `${element} is not a valid foreign key` }
        }
      }


      switch (template[element].type) {
      case 'string':
        if (typeof body[element] !== 'string') {
          return { 'msg': `a different type is expected from ${element}` }
        }
        break;
      case 'int':
        if (isNaN(body[element])) {
          return { 'msg': `a different type is expected from ${element}` }
        }
        break;
      case 'email':
        if (body[element].match('@') === null) {
          return { 'msg': `a different type is expected from ${element}` }
        }
        break;
      case 'date' :
        if (isNaN(Date.parse(body[element]))) {
          return { 'msg': `a different type is expected from ${element}` }
        }
        break;
      }
    }
  }

  /**
   * This function checks if the items recieved by body to be the correct type
   *
   * @param {*} template
   * @param {*} body
   */
  async update (template, body) {
    const names = Object.getOwnPropertyNames(template)

    for (let x = 0; x < names.length; x++) {
      const element = names[x]

      if (body[element]) {

        if (template[element].unique) {
          const result = await checkUnique(template[element].unique, element, body[element])

          if (result.length > 0) {
            return { 'msg': `${element} must be unique` }
          }
        }

        if (template[element].foreign) {
          const result = await checkUnique(template[element].foreign.table, template[element].foreign.row, body[element])

          if (result.length === 0) {
            return { 'msg': `${element} is not a valid foreign key` }
          }
        }

        switch (template[element].type) {
        case 'string':
          if (typeof body[element] !== 'string') {
            return { 'msg': `a different type is expected from ${element}` }
          }
          break;
        case 'int':
          if (isNaN(body[element])) {
            return { 'msg': `a different type is expected from ${element}` }
          }
          break;
        case 'email':
          if (body[element].match('@') === null) {
            return { 'msg': `a different type is expected from ${element}` }
          }
          break;
        case 'date' :
          if (isNaN(Date.parse(body[element]))) {
            return { 'msg': `a different type is expected from ${element}` }
          }
          break;
        }
      }
    }
  }
}

module.exports = CheckTemplate
