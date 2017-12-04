module.exports = (type = null) => async data => {
  if (!Array.isArray(data)) {
    throw new TypeError('Array expected')
  } else if (!type) {
    return data;
  }
  return Promise.all(data.map(type))
}
