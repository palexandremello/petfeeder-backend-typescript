import { getManager } from 'typeorm'

import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import AccountEntity from '../entities/account'

export class AccountPostgresRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const repository = getManager().getRepository(AccountEntity)

    const account = await repository.save(accountData)
    console.log(account)
    return account
  }
}
