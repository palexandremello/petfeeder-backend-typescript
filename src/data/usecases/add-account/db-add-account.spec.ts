import { DbAddAccount } from './db-add-account'

describe('DbAddAccount  Usecase', () => {
  test('Should call encrypter with correct password', () => {
    class EncryptStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncryptStub()
    const sut = new DbAddAccount(encrypterStub)
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
  })
})
