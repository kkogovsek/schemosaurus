import test from 'ava'
import schemosaurus from '../index.js'

test('Should properly return number', async t => {
  const validator = schemosaurus(async n => Number(n))
  t.is(await validator(4), 4)
})

test('Error should be thrown', async t => {
  const validator = schemosaurus(async n => { throw new TypeError('Error') })
  await t.throws(validator(), TypeError)
})
