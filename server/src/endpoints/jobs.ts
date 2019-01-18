import { BaseContext } from 'koa'
import { JobWithId } from 'types'

export async function getJobs(ctx: BaseContext) {
  const collection = ctx.firestore.collection('jobs')
  const snapshot = await collection.get()
  const data = snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => {
    const id = doc.id
    const data: JobWithId = doc.data() as JobWithId
    data.id = id
    data.createdAt = doc.get('createdAt').toDate()
    delete data.description
    return data
  })
  ctx.body = {
    data
  }
}
