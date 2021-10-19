import { HttpReponse, HttpRequest } from '../protocols/http'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpReponse>
}
