import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { HttpReponse, HttpRequest } from '../protocols/http'

class SignUpController {
  handle(httpRequest: HttpRequest): HttpReponse {
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'birthday',
      'sex',
    ]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}

export default SignUpController
