import Question1 from '../questions/Question1'

describe('Question1', () => {
  const questionOneData = [10, 2, 38, 23, 38]
  it('should return 22.2 for Question1([10,2,38,23,38])', () => {
    expect(Question1(questionOneData)).toBe(22.2)
  })
})
