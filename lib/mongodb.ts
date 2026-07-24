import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string

if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

const globalWithMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>
}

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise
