import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { IEmailValidator } from '../protocols/email-validator'
import SignUpController from './signup'

interface ISutTypes {
  sut: SignUpController
  emailValidatorStub: IEmailValidator
}
const makeSut = (): ISutTypes => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub,
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no first_name is provided', () => {
    const { sut } = makeSut()
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
    test('{Should return 400 if no last_name is provided', () => {
      const { sut } = makeSut()
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
      const { sut } = makeSut()
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
      const { sut } = makeSut()
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
      const { sut } = makeSut()
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
    }),
    test('Should return 400 if no password is provided', () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('password'))
    }),
    test('Should return 400 if no passwordConfirmation is provided', () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(
        new MissingParamError('passwordConfirmation')
      )
    }),
    test('Should return 400 if an invalid email is provided', () => {
      const { sut, emailValidatorStub } = makeSut()
      jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'teste_email@mail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new InvalidParamError('email'))
    }),
    test('Should call EmailValidator with correct email', () => {
      const { sut, emailValidatorStub } = makeSut()
      const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'any@mail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      sut.handle(httpRequest)

      expect(isValidSpy).toHaveBeenCalledWith('any@mail.com')
    }),
    test('Should return 500 if EmailValidator throws', () => {
      class EmailValidatorStub implements IEmailValidator {
        isValid(email: string): boolean {
          throw new Error()
        }
      }
      const emailValidatorStub = new EmailValidatorStub()
      const sut = new SignUpController(emailValidatorStub)
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'any@mail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpReponse = sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(500)
      expect(httpReponse.body).toEqual(new ServerError())
    })
})
