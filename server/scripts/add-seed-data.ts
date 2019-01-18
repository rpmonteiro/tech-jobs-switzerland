import { config } from '../src/config'
import { Firestore } from '@google-cloud/firestore'
import { seedJobs } from '../seed-data/seed-jobs'

const firestore = new Firestore({
  projectId: config.googleProjectId,
  keyFilename: config.firestoreKeyPath,
  timestampsInSnapshots: true
})

const collection = firestore.collection('jobs')

let count = 0
seedJobs.map(async (data) => {
  try {
    count++
    await collection.add(data)
  } catch (error) {
    console.log('Something went wrong adding this document', data)
  }
})

console.log(`Success - ${count} documents added.`)
