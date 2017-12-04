import test from 'ava'
import schemosaurus from '../../index.js'
const { NUMBER } = schemosaurus.types

test('Should parse numbers', async t => {
  const validator = NUMBER()
  t.is(await validator(1), 1)
  t.is(await validator(1.1), 1.1)
  t.is(await validator('1.1'), 1.1)
})

test('Should not throw for null and undefined', async t => {
  const validator = NUMBER()
  t.is(await validator(null), null)
  t.is(await validator(undefined), undefined)
})

test('Should throw for NaN', async t => {
  const validator = NUMBER()
  await t.throws(validator('a'), TypeError)
})
