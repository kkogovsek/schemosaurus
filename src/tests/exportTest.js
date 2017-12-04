import test from 'ava'
import schemosaurus from '../index.js'

test('Export should be a functions', t => {
  t.is(typeof schemosaurus, 'function')
})

test('Should cover base types', t => {
  const types = [
    'ARRAY', 'OBJECT', 'NUMBER', 'STRING', 'BOOLEAN'
  ]
  t.true(schemosaurus.hasOwnProperty('types'))
  for (const type of types) {
    t.true(schemosaurus.types.hasOwnProperty(type))
  }
})

test('Should cover base descriptors', async t => {
  const descriptors = [
    'REQUIRED' // TODO add more
  ]
  t.true(schemosaurus.hasOwnProperty('descriptors'))
  for (const descriptor of descriptors) {
    t.true(schemosaurus.descriptors.hasOwnProperty(descriptor))
  }
})

test('Should throw for non object', async t => {
  const validator = schemosaurus.types.OBJECT()
  await t.throws(validator(123), TypeError)
})
