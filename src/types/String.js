module.exports = (type = async val => val) => async data => {
  return type(data ? data.toString() : data)
}
