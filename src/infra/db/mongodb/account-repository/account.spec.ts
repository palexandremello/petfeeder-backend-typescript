import { MongoHelper } from '../helpers/mongo-helpers'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return and account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      first_name: 'Paulo Alexandre',
      last_name: 'Mello',
      email: 'palexandremello@gmail.com',
      password: 'any_password',
      birthday: '08/10/1994',
      sex: 'M',
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.first_name).toBe('Paulo Alexandre')
    expect(account.last_name).toBe('Mello')
    expect(account.email).toBe('palexandremello@gmail.com')
    expect(account.password).toBe('any_password')
    expect(account.birthday).toBe('08/10/1994')
    expect(account.sex).toBe('M')
  })
})
