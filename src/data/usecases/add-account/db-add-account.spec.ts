import { DbAddAccount } from './db-add-account'
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from './db-add-account-protocols'

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'hashed_password',
        birthday: '08/10/1994',
        sex: 'M',
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  }
}
describe('DbAddAccount  Usecase', () => {
  test('Should call encrypter with correct password', () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      first_name: 'Paulo Alexandre',
      last_name: 'Mello',
      email: 'palexandremello@gmail.com',
      password: 'valid_password',
      birthday: '08/10/1994',
      sex: 'M',
    }
    sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  }),
    test('Should throw if Encrypter throws', async () => {
      const { sut, encrypterStub } = makeSut()
      jest
        .spyOn(encrypterStub, 'encrypt')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        )
      const accountData = {
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'valid_password',
        birthday: '08/10/1994',
        sex: 'M',
      }
      const promise = sut.add(accountData)
      await expect(promise).rejects.toThrow()
    }),
    test('Should call encrypter with correct password', async () => {
      const { sut, addAccountRepositoryStub } = makeSut()
      const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
      const accountData = {
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'valid_password',
        birthday: '08/10/1994',
        sex: 'M',
      }
      await sut.add(accountData)
      expect(addSpy).toHaveBeenCalledWith({
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'hashed_password',
        birthday: '08/10/1994',
        sex: 'M',
      })
    }),
    test('Should throw if AddAccountRepository throws', async () => {
      const { sut, addAccountRepositoryStub } = makeSut()
      jest
        .spyOn(addAccountRepositoryStub, 'add')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        )
      const accountData = {
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'valid_password',
        birthday: '08/10/1994',
        sex: 'M',
      }
      const promise = sut.add(accountData)
      await expect(promise).rejects.toThrow()
    }),
    test('Should return an account on success', async () => {
      const { sut } = makeSut()
      const accountData = {
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'valid_password',
        birthday: '08/10/1994',
        sex: 'M',
      }
      const account = await sut.add(accountData)
      expect(account).toEqual({
        id: 'valid_id',
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'hashed_password',
        birthday: '08/10/1994',
        sex: 'M',
      })
    })
})
