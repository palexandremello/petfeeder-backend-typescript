import { createConnection, getConnection } from 'typeorm'

const PostgresHelper = {
  async create() {
    await createConnection()
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
