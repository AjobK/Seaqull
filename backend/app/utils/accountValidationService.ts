import Account from '../entities/account'
import * as bcrypt from 'bcrypt'
import AccountDAO from '../daos/accountDAO'

class AccountValidationService {
    private accountDAO: AccountDAO

    constructor() {
      this.accountDAO = new AccountDAO()
    }

    public validateAccountRequest = (account: Account, username: string, password: string): any => {
      try {
        if (username === account.user_name) {
          if (!bcrypt.compareSync(password, account.password)) {
            if (account.login_attempts_counts != 2) {
              account.login_attempts_counts++
              this.accountDAO.updateAccount(account)

              return { errors: ['Incorrect username or password'] }
            } else {
              account.login_attempts_counts = null
              account.locked_to = Date.now() + 30000
              this.accountDAO.updateAccount(account)
              const remainingTime = Math.floor((account.locked_to - Date.now()) / 1000)

              return { errors: ['Too many login attempts'], remainingTime: remainingTime }
            }
          } else {
            return null
          }
        } else {
          return { errors: ['Incorrect username or password'] }
        }
      } catch (error) {
        return { errors: ['Incorrect username or password'] }
      }
    }
}

export default AccountValidationService
