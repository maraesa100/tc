import Question1 from '../questions/Question1'

describe('Question1: Arithmetic Mean', () => {
  const questionOneData = [10, 2, 38, 23, 38]
  it('should return the average of an array of numbers', () => {
    expect(Question1(questionOneData)).toBe(22.2)
  })
})
