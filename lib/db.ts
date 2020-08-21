import {MongoClient, Db} from 'mongodb'

const uri = process.env.MONGODB_URL
const dbName = process.env.MONGODB_DB || 'analysis'

let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase(): Promise<{
  client: MongoClient
  db: Db
}> {
  if (cachedClient && cachedDb) {
    return {client: cachedClient, db: cachedDb}
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return {client, db}
}
