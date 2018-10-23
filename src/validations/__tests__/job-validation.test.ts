import expect from 'expect'
import { jobSchema } from 'validations/job'

describe('job validations', () => {
  it('should fail!', async () => {
    const res = await jobSchema.validate({})
    console.log({ res })
    expect(1).toEqual(2)
  })
})
