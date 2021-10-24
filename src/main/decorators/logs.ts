import {
  Controller,
  HttpReponse,
  HttpRequest,
} from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  constructor(controller: Controller) {
    this.controller = controller
  }

  async handle(httpRequest: HttpRequest): Promise<HttpReponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
