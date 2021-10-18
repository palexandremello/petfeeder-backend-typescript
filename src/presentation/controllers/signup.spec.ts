import SignUpController from './signup'
describe('SignUp Controller', () => {
  test('Should return 400 if no first_name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        last_name: 'Mello',
        email: 'palexandremello@gmail.com',
        password: '147258',
        passwordConfirmation: '147258',
        birthday: '08/10/1994',
        sex: 'M',
      },
    }
    const httpReponse = sut.handle(httpRequest)

    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new Error('Missing param: name'))
  })
})
