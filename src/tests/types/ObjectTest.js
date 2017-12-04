import test from 'ava'
import schemosaurus from '../../index.js'

test('Should validate object without schema (mixed)', async t => {
  const validate = schemosaurus(schemosaurus.types.OBJECT())
  t.deepEqual(
    await validate({ 'testKey': 'testValue' }),
    { 'testKey': 'testValue' }
  )
})

test('Should validate defined object keys', async t => {
  const validate = schemosaurus(schemosaurus.types.OBJECT({
    'testKey': async value => value
  }))

  t.deepEqual(
    await validate({ 'testKey': 'testValue' }),
    { 'testKey': 'testValue' }
  )
})
