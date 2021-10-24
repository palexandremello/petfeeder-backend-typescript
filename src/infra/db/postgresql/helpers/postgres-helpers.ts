import 'reflect-metadata'

import { createConnection, getConnection } from 'typeorm'

const PostgresHelper = {
  async create(drop = false) {
    await createConnection({
      type: 'postgres',
      host: '172.17.0.1',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'petfeeder',
      entities: ['./src/infra/db/postgresql/entities/*.ts'],
      synchronize: drop,
      dropSchema: drop,
      migrations: ['./src/database/migrations/*.ts'],
      cli: {
        migrationsDir: './src/database/migrations',
      },
    })
  },

  async close() {
    await getConnection().close()
  },

  async clear() {
    const connection = getConnection()
    const entities = connection.entityMetadatas

    await Promise.all(
      entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name)
        await repository.query(`DELETE FROM ${entity.tableName};`)
      })
    )
  },
}

export default PostgresHelper
