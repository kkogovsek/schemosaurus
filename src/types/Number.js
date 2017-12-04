const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n)

module.exports = (type = async n => n) => async data => {
  if (data === undefined || data === null) {
    return type(data)
  } else if (!isNumber(data)) {
    throw new TypeError(`Expected ${data} to be a number`)
  }
  return type(Number(data))
}
