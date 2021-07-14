// Testing function
const palindrome = require('../utils/for_testing').palindrome

// Individual test cases are defined using the test function
// First param is the test description
// Second param is a function that defined functionality for the test case

test('palindrome of a', () => {
  const result = palindrome('a')
  // Expect wraps the resulting value in an object that offers a collection of matcher functions
  // Since we are using two strings, we use toBe
  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = palindrome('react')
  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})

