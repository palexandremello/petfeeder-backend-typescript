import { ServerError } from '../errors'
import { HttpReponse } from '../protocols/http'

export const badRequest = (error: Error): HttpReponse => ({
  statusCode: 400,
  body: error,
})

export const serverError = (): HttpReponse => ({
  statusCode: 500,
  body: new ServerError(),
})

export const ok = (data: any): HttpReponse => ({
  statusCode: 200,
  body: data,
})
