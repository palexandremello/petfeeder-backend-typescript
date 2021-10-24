import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helpers'
import PostgresHelper from '../infra/db/postgresql/helpers/postgres-helpers'
import env from './config/env'

PostgresHelper.create()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => {
      console.log(
        `Server running at at url: http://localhost and port: ${env.port}`
      )
    })
  })
  .catch(console.error)
