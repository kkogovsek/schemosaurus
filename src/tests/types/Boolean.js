import test from 'ava'
import schemosaurus from '../../index.js'
const { BOOLEAN } = schemosaurus.types

test('Should work for different types', async t => {
  const validator = BOOLEAN()
  t.true(await validator({}))
  t.true(await validator([]))
  t.true(await validator(1))
  t.true(await validator(true))
  t.false(await validator(false))
  t.false(await validator(null))
  t.false(await validator(undefined))
})

