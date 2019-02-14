class CheckTemplate {
  /**
   * Requires each item in the template to be send in the body
   *
   * @param {*} template
   * @param {*} body
   */
  create (template, body) {
    const object = Object.getOwnPropertyNames(template)

    let msg

    object.forEach(element => {
      if (template[element].required) {
        if (body[element]) {
          switch (template[element].type) {
          case 'string' :
            if (typeof body[element] !== 'string') {
              msg = { 'msg': `${element} is not a string` }
            }
            break;
          case 'int' :
            if (isNaN(body[element])) {
              msg = { 'msg': `${element} is not a integer` }
            }
            break;
          case 'email' :
            if (body[element].match('@') === null) {
              msg = { 'msg': `${element} is not a valid email` }
            }
            break;
          case 'date' :
            if (isNaN(Date.parse(body[element]))) {
              msg = { 'msg': `${element} is not a valid date` }
            }
            break;
          }
        } else {
          msg = { 'msg': 'body is not complete! missing: ' + element }
        }
      } else {
        if (body[element]) {
          switch (template[element].type) {
          case 'string' :
            if (typeof body[element] !== 'string') {
              msg = { 'msg': `${element} is not a string` }
            }
            break;
          case 'int' :
            if (isNaN(body[element])) {
              msg = { 'msg': `${element} is not a integer` }
            }
            break;
          case 'email' :
            if (body[element].match('@') === null) {
              msg = { 'msg': `${element} is not a valid email` }
            }
            break;
          case 'date' :
            if (isNaN(Date.parse(body[element]))) {
              msg = { 'msg': `${element} is not a valid date` }
            }
            break;
          }
        }
      }
    })

    return msg
  }

  /**
   * This function checks if the items recieved by body to be the correct type
   *
   * @param {*} template
   * @param {*} body
   */
  update (template, body) {
    const object = Object.getOwnPropertyNames(body)
    let msg

    object.forEach(element => {
      switch (template[element].type) {
      case 'string' :
        if (typeof body[element] !== 'string') {
          msg = { 'msg': `${element} is not a string` }
        }
        break;
      case 'int' :
        if (isNaN(body[element])) {
          msg = { 'msg': `${element} is not a integer` }
        }
        break;
      case 'email' :
        if (body[element].match('@') === null) {
          msg = { 'msg': `${element} is not a valid email` }
        }
        break;
      case 'date' :
        if (isNaN(Date.parse(body[element]))) {
          msg = { 'msg': `${element} is not a valid date` }
        }
        break;
      }
    })

    return msg
  }
}

module.exports = CheckTemplate
