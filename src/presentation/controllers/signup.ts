import { AddAccount } from '../../domain/usecases/add-account'
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
  private readonly addAccount: AddAccount
  constructor(emailValidator: IEmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
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

      const {
        first_name,
        last_name,
        email,
        password,
        birthday,
        sex,
        passwordConfirmation,
      } = httpRequest.body

      if (password != passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        first_name,
        last_name,
        email,
        password,
        birthday,
        sex,
      })
    } catch (error) {
      return serverError()
    }
  }
}

export default SignUpController
