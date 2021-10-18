import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../helpers/controller'
import { badRequest } from '../helpers/http-helpers'
import { HttpReponse, HttpRequest } from '../protocols/http'

class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpReponse {
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'birthday',
      'sex',
      'password',
      'passwordConfirmation',
    ]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}

export default SignUpController
