import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  isConnected: null as boolean,
  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.isConnected = true
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
    this.isConnected = false
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.isConnected) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...accountWithoutId } = collection

    return Object.assign({}, accountWithoutId, {
      id: _id.toString(),
    })
  },
}
