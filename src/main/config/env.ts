export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/pet-feeder-api',
  port: process.env.PORT || 3333,
}
