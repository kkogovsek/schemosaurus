module.exports = (type = async t => t) => async data => {
  const value = data ? true : false
  return type(value)
}
