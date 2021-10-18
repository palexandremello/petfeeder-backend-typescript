import { MissingParamError } from '../errors/missing-param-error'
import SignUpController from './signup'
describe('SignUp Controller', () => {
  test('Should return 400 if no first_name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: '147258',
        passwordConfirmation: '147258',
        birthday: '08/10/1994',
        sex: 'M',
      },
    }
    const httpReponse = sut.handle(httpRequest)

    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('first_name'))
  }),
    test('Should return 400 if no last_name is provided', () => {
      const sut = new SignUpController()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          email: 'palexandremello@gmail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('last_name'))
    }),
    test('Should return 400 if no email is provided', () => {
      const sut = new SignUpController()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('email'))
    }),
    test('Should return 400 if no birthday is provided', () => {
      const sut = new SignUpController()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: '147258',
          passwordConfirmation: '147258',
          sex: 'M',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('birthday'))
    }),
    test('Should return 400 if no sex is provided', () => {
      const sut = new SignUpController()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('sex'))
    })
})
