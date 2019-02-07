class CheckTemplate {
  check (template, body) {
    const test = Object.getOwnPropertyNames(template)
    let msg

    test.forEach((element) => {
      if (!body[element] && template[element].required) {
        msg = { 'msg': `${element} has not been send` }
      } else {
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
          if (isNaN(Date.parse(body[element])) && !template[element].type) {
            msg = { 'msg': `${element} is not a valid date` }
          }
          break;
        }
      }
    })

    return msg
  }
}

module.exports = CheckTemplate
