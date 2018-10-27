import expect from 'expect'
import { jobSchema } from 'validations/job'

describe('job validations', () => {
  it('should fail!', async () => {
    try {
      await jobSchema.validate({})
    } catch (error) {
      const err = error
      expect(err).toEqual('[ValidationError: child "title" fails because ["title" is required]]​​')
    }
  })
})
