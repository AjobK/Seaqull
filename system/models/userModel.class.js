const Connection = require('../connection.js')
const defaultModel = require('./defaultModel.class.js')

class UserModel extends defaultModel {
  selectName (user_name, callback) {
    let formatUser = '%'

    formatUser += user_name + '%'
    const sql = 'SELECT id, user_name, display_name, level, role FROM User WHERE user_name LIKE ?'

    Connection.query(sql, formatUser, (err, result) => {
      if (err) throw err
      callback(result)
    })
  }
}

module.exports = UserModel
