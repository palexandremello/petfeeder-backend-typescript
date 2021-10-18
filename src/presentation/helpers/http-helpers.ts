import { HttpReponse } from '../protocols/http'

export const badRequest = (error: Error): HttpReponse => ({
  statusCode: 400,
  body: error,
})
