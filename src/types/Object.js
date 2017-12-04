module.exports = (type = null) => async data => {
  if (typeof data !== 'object') {
    throw new TypeError('Object expected')
  } else if (!type) {
    return data
  }
  const validated = await Promise.all(
    Object.entries(type).map(
      async ([key, validator]) => validator(data[key]).then(result => ({
        [key]: result
      }))
    )
  )
  return validated.reduce(
    (object, toAdd) => Object.assign(object, toAdd), {}
  )
}
