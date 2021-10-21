import { DbAddAccount } from './db-add-account'
import { Encrypter } from './db-add-account-protocols'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub,
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
    })
})
