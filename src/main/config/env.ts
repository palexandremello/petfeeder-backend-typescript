export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/pet-feeder-api',
  postgresUrl: process.env.POSTGRES_URL || 'localhost',
  postgresPort: 5432,
  port: process.env.PORT || 3333,
}
