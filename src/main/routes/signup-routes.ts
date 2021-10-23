import { Router } from 'express'

import { adaptRoutes } from '../adapters/express-routes-adapter'
import { makeSingUpController } from '../factories/signup'
export default (router: Router): void => {
  router.post('/signup', adaptRoutes(makeSingUpController()))
}
