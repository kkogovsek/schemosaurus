import test from 'ava'
import schemosaurus from '../../index.js'

test('Should throw for null', async t => {
  await t.throws(schemosaurus.descriptors.REQUIRED()(null))
})

test('Should throw for undefined', async t => {
  await t.throws(schemosaurus.descriptors.REQUIRED()(undefined))
})

test('Should not throw for false', async t => {
  t.false(await schemosaurus.descriptors.REQUIRED()(false))
})
