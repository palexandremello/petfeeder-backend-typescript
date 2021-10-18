import { ServerError } from '../errors/server-error'
import { HttpReponse } from '../protocols/http'

export const badRequest = (error: Error): HttpReponse => ({
  statusCode: 400,
  body: error,
})

export const serverError = (): HttpReponse => ({
  statusCode: 500,
  body: new ServerError(),
})
