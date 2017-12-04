# Introduction and motivation

I started this library, because I must validate a lot of data and I really hate
validating all the things manualy. I know there are lots of validator out there
but I decided to build my own to learn something new or to help you folks in
etherna search for validations. This one is different from others, because all
checking is async and sometimes it does things for you (like booleans will
evaluate variable to boolean and string will do the same). And it's not just
validator for schema because it will normaly return object prepared in the way
you described it with oyur schema which means that you can basicly use it as
payload generator (I will show you that later).

# Base concepts

Say you want to transform an input variable to number. You would basicly do
something like:
```js
const toNumber = val => Number(val)
```

Or you want your variable to be string you would do:
```js
const toString = val => val.toString()
```

But what if you have an array and you want to transform single variable to array
and leave array be. You would do:
```js
const ensureArray = val => Array.isArray(val) ? val : [val]
```

Or if you have an object with properties *foo* and *bar* you would ensure it
with:
```
const ensureFooBar = ({ foo, bar }) => ({ foo, bar })
ensureFooBar({ foo: 'foo', bar: 1, nonFooBar: 'test' })
// Where output would be { foo: 'foo', bar: 1 }
```

But this were all simple one level cases. What if you have more complex schema? You could
combine all this together and make:
```js
const enshureSchema = ({ foo, bar }) => ({
  foo: toString(foo), bar: toNumber(bar)
})
// and the validation and transformation woul do:
enshureSchema({ foo: 1, bar: '5.2' })
// Which would return: 
```

And if you would like to make your schema as an array you would do
```js
const data = { foo: 1, bar: '5.2' }
ensureArray(data).map(dataItem => enshureSchema(dataItem))
// Which woul produce [{ foo: '1', bar: 5.2 }] and it is what you want
```

So in order to achive that type of results I created this library to hel you
build nested schemas and reuse them as much as possible all across the app.

With **schemosaurus** you woul do previous example as:
```js
import Schemosaurus from 'schemosaurus'
const { OBJECT, STRING, NUMBER } = Schemosaurus.types

const schema = Schemosaurus(OBJECT({
  foo: STRING(),
  bar: NUMBER()
}))
```

Notice how all the types are called as function? This is because of the design
of validator and transformer functions. To use a new type you need a function
that for given data returns something new or throw an error. So you can make
your own enumerator like:
```js
const colors = { blue: 1, red: 2, green: 3 }

const enumerateColor = color => {
  const colorCode = colors[color]
  if (!colorCode) {
    throw new TypeError(`Color ${color} is not defined`)
  }
  return colorCode
}
// enumerateColor('green') would return 3
```

This function not only validated that our parameter was in fact valid but also
changed the content. But if we would like to also add hex number for color but
not always do that we could chain that color with:
```js
const hexCodes = { 1: '#00F', 2: '#F00', 3: '#0F0' }
const addHex = colorCode => ({ colorCode, hex: hexCodes[colorCode] })
// And then use it:
hexCodes(enumerateColor('blue')) // Returns: { colorCode: 1, hex: '#00F' }
```

But you can't always do that in your code and specify it as a schema, so I
turned things arround and said that schemosaurus type could also be extended
after being processed and in order to achive that you must first generate a
validator (function) with next checker. So you do:
```js
const colors = { blue: 1, red: 2, green: 3 }

const enumerateColor = (nextType = val => val) => color => {
  const colorCode = colors[color]
  if (!colorCode) {
    throw new TypeError(`Color ${color} is not defined`)
  }
  return nextType(colorCode)
}

const hexCodes = { 1: '#00F', 2: '#F00', 3: '#0F0' }
const addHex = (nextType = val => val) => colorCode => nextType(
  { colorCode, hex: hexCodes[colorCode] }
)
// And now you can do
const mySpecialColor = enumerateColor(addHex())
// Which produces checker and transformer for your variable. Now every time you
// want to transform color in such way you can use mySpecialColor('blue')
```

And the best thing about it is that all of the functions are async so you can
grab something from database and evaluate it as something else like:

```js
const fetchUser = type => async userId => {
  const user = await getUserFromDatabase(userId)
  return type(user)
}

const extractuUsernameAndMail = type => async ({ username, email }) => type({
  username, email
})
const produceUser = fetchUser(extractuUsernameAndMail(val => val))
const user1 = await produceUser(1)
const user2 = await produceUser(2)
```

# How to install

```bash
npm install schemosaurus
```

# API
If you `const Schemosaurus = require('schemosaurus')` you get a wrapping
function for your validators. It looks like:
```js
const Schemosaurus = type => async data => type(data)
```

# Types
Types are predefined types and are stored as ```Schemosaurus.types```
Availivle types will be listed but note that for every type you must call it to
produce validator/transformer but you can pass in next validator.

## STRING
Converts input to string and calls next validator

## NUMBER
Validates input as numbers and if it's not null or undefined it throws an error
if it can't enumerate input.

## OBJECT
If nothing is passed it just validates that it got an object and returns it.

If you add a validator it must be consisted of keys, you want to validate and
validator calls for them. Example:
```js
OBJECT({
  foo: STRING(),
  bar: NUMBER()
})
```

## ARRAY
Validates that imput is an array and maps each part of an array to next validator
asynchroniously. Example:
```js
ARRAY(OBJECT({
  foo: STRING(),
  bar: NUMBER()
}))
```

## BOOLEAN
Always evaluates content as thruthy or falsy. So:
```js
const validator = BOOLEAN()
validator(true) // True
validator(1) // True
validator('Some string') // True
validator(false) // False
validator(null) // False
validator(undefined) // False
validator(0) // False
```

# Future
[ ] Make it availivle on npm
[ ] Standardize outputs and check types to gain percision and predictability
[ ] Make it browser compatible as well
[ ] Get som badass logo
[ ] Online examples in sandboxes
[ ] CI for test automation
[ ] ...
