/**
 * The purpouse of this library is to validate schemas and transform data
 * to wanted data structure as simple as possible. It will be async in order
 * to validate custom tipes (like enumerators stored in database) and it should
 * be very simple to use and extend without changing the core idea.
 *
 * The flow would be:
 * - Register schema and get validator function in return which means every
 *   validator eaven for simple types as numbers, strings, ... is a function
 *   (async to be specific)
 */

const generate = type => async data => type(data)

module.exports = Object.assign(
  generate,
  {
    types: require('./types'),
    descriptors: require('./descriptors')
  }
)
