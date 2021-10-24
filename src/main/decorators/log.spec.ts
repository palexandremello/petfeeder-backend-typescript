import {
  Controller,
  HttpReponse,
  HttpRequest,
} from '../../presentation/protocols'
import { LogControllerDecorator } from './logs'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
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
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub,
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
    })
})
