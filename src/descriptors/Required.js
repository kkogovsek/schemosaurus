module.exports = (type = async v => v) => async data => {
  if (!data && data !== false) {
    throw new TypeError('This field is required')
  }
  return type(data)
}
