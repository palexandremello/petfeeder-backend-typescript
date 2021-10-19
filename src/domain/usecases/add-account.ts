import { AccountModel } from './models/account'

export interface AddAccountModel {
  first_name: string
  last_name: string
  email: string
  password: string
  birthday: string
  sex: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>
}
