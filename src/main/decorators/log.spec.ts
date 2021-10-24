import {
  Controller,
  HttpReponse,
  HttpRequest,
} from '../../presentation/protocols'
import { LogControllerDecorator } from './logs'

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
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
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
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
  })
})
