import PostgresHelper from '../helpers/postgres-helpers'
import { AccountPostgresRepository } from './account'

describe('Account PostgreSQL Repository ', () => {
  beforeAll(async () => {
    await PostgresHelper.create()
  })

  afterAll(async () => {
    await PostgresHelper.close()
  })

  beforeEach(async () => {
    await PostgresHelper.clear()
  })

  test('Should return an account on success ', async () => {
    const accountPostgresRepository = new AccountPostgresRepository()
    const account = await accountPostgresRepository.add({
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
