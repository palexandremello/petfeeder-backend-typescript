import request from 'supertest'

import app from '../config/app'

describe('SignUp Routes', () => {
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
