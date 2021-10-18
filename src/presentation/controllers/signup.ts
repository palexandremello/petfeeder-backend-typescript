class SignUpController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.first_name) {
      return { statusCode: 400, body: new Error('Missing param: name') }
    }

    if (!httpRequest.body.last_name) {
      return { statusCode: 400, body: new Error('Missing param: last_name') }
    }

    if (!httpRequest.body.email) {
      return { statusCode: 400, body: new Error('Missing param: email') }
    }
  }
}

export default SignUpController
