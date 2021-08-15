import { helloSarasvati } from '../src/index'

test('Hello, Sarasvati!', () => {
  const value = helloSarasvati()
  expect(value).toBe('Hello, Sarasvati!')
})
