import { BaseContext } from 'koa'

export async function getJobs(ctx: BaseContext) {
  const collection = ctx.firestore.collection('jobs')
  const snapshot = await collection.get()
  const data = snapshot.docs.map((doc) => {
    const id = doc.id
    const data = doc.data()
    data.id = id
    delete data.description
    return data
  })

  ctx.body = {
    data
  }
}
