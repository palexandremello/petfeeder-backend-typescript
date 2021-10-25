import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helpers'
import {
  Controller,
  HttpReponse,
  HttpRequest,
} from '../../presentation/protocols'
import { LogControllerDecorator } from './logs'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      return new Promise((resolve) => resolve(null))
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    handle(httpRequest: HttpRequest): Promise<HttpReponse> {
      const httpResponse: HttpReponse = {
        body: {
          message: 'OK',
        },
        statusCode: 200,
      }
      return new Promise((resolve) => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        first_name: 'Paulo Alexandre',
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: 'any_password',
        confirmationPassword: 'any_password',
        birthday: '08/10/1994',
        sex: 'M',
      },
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  }),
    test('Should return the same result of the controller', async () => {
      const { sut } = makeSut()

      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: 'any_password',
          confirmationPassword: 'any_password',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual({
        statusCode: 200,
        body: {
          message: 'OK',
        },
      })
    }),
    test('Should call LogErrorREpository with correct error if controller returns a server error', async () => {
      const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

      const fakeError = new Error()
      fakeError.stack = 'any_stack'
      const error = serverError(fakeError)

      const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

      jest
        .spyOn(controllerStub, 'handle')
        .mockReturnValueOnce(new Promise((resolve) => resolve(error)))

      const httpRequest = {
        body: {
          first_name: 'Paulo Alexandre',
          last_name: 'Mello',
          email: 'palexandremello@gmail.com',
          password: 'any_password',
          confirmationPassword: 'any_password',
          birthday: '08/10/1994',
          sex: 'M',
        },
      }
      await sut.handle(httpRequest)
      expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})
