import { rejects } from 'assert'

import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import SignUpController from './signup'
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  IEmailValidator,
} from './signup-protocols'

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const mockAccount = {
        id: '123',
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: '147258',
        birthday: '08/10/1994',
        sex: 'M',
      }
      return new Promise((resolve) => resolve(mockAccount))
    }
  }
  return new AddAccountStub()
}

interface ISutTypes {
  sut: SignUpController
  emailValidatorStub: IEmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub,
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no first_name is provided', async () => {
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
    const httpReponse = await await sut.handle(httpRequest)

    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('first_name'))
  }),
    test('Should return 400 if no last_name is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('last_name'))
    }),
    test('Should return 400 if no email is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('email'))
    }),
    test('Should return 400 if no birthday is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('birthday'))
    }),
    test('Should return 400 if no sex is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('sex'))
    }),
    test('Should return 400 if no password is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new MissingParamError('password'))
    }),
    test('Should return 400 if no passwordConfirmation is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(
        new MissingParamError('passwordConfirmation')
      )
    }),
    test('Should return 400 if an invalid password is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new InvalidParamError('password'))
    }),
    test('Should return 400 if an invalid passwordConfirmation is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(
        new InvalidParamError('passwordConfirmation')
      )
    }),
    test('Should return 400 if passwordConfirmation is differente than password', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: '147258',
          passwordConfirmation: 'invalid',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(
        new InvalidParamError('passwordConfirmation')
      )
    }),
    test('Should return 400 if an invalid email is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new InvalidParamError('email'))
    }),
    test('Should return 400 if an invalid email is provided', async () => {
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(400)
      expect(httpReponse.body).toEqual(new InvalidParamError('email'))
    }),
    test('Should call EmailValidator with correct email', async () => {
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
      await sut.handle(httpRequest)

      expect(isValidSpy).toHaveBeenCalledWith('any@mail.com')
    }),
    test('Should return 500 if EmailValidator throws', async () => {
      const { sut, emailValidatorStub } = makeSut()
      jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
        throw new Error()
      })
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
      const httpReponse = await sut.handle(httpRequest)

      expect(httpReponse.statusCode).toBe(500)
      expect(httpReponse.body).toEqual(new ServerError())
    }),
    test('Should call AddAccount with correct values', async () => {
      const { sut, addAccountStub } = makeSut()
      const addSpy = jest.spyOn(addAccountStub, 'add')
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      await sut.handle(httpRequest)
      expect(addSpy).toHaveBeenCalledWith({
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: '147258',
        birthday: '08/10/1994',
        sex: 'M',
      })
    }),
    test('Should return 500 if AddAccount throws', async () => {
      const { sut, addAccountStub } = makeSut()
      jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()))
      })
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.body).toEqual(new ServerError())
    }),
    test('Should return 200 if valida data is provided', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: '147258',
          passwordConfirmation: '147258',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpResponse = await sut.handle(httpRequest)

      expect(httpResponse.statusCode).toBe(200)
      expect(httpResponse.body).toEqual({
        id: '123',
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: '147258',
        birthday: '08/10/1994',
        sex: 'M',
      })
    })
})
