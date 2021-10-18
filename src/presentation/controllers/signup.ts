import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { badRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { IEmailValidator } from '../protocols/email-validator'
import { HttpReponse, HttpRequest } from '../protocols/http'

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

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      }
    }
  }
}

export default SignUpController
