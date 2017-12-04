import test from 'ava'
import schemosaurus from '../../index.js'

test('Should work for blank array', async t => {
  const validator = schemosaurus.types.ARRAY(async n => n)
  t.deepEqual(await validator([]), [])
})

test('Should throw for invalid children type', async t => {
  const validator = schemosaurus.types.ARRAY(
    schemosaurus.types.OBJECT()
  )
  await t.throws(validator([{}, 1]), TypeError)
})

test('Should be ok for valid members', async t => {
  const validator = schemosaurus.types.ARRAY(
    schemosaurus.types.OBJECT()
  )
  t.deepEqual(await validator([{ a: 1 }]), [{ a: 1 }])
})
