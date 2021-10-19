import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helpers'
import {
  Controller,
  HttpReponse,
  HttpRequest,
  IEmailValidator,
} from '../protocols'

class SignUpController implements Controller {
  private readonly emailValidator: IEmailValidator
  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }
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
    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body

      if (password != passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}

export default SignUpController
