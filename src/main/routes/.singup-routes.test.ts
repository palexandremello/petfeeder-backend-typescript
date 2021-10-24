import request from 'supertest'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: '123',
        passwordConfirmation: '123',
        birthday: '08/10/1994',
        sex: 'M',
      })
      .expect(200)
  })
})
