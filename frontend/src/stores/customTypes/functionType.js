import { types } from 'mobx-state-tree'

const parseFunction = (value) => {
  try {
    return Function(`'use strict'; return (${value});`)()
  } catch (e) {
    throw new Error(`${value} is not a valid function`)
  }
}

export const functionType = types.custom({
  name: 'functionType',
  fromSnapshot(value) {
    return parseFunction(value)
  },
  toSnapshot(value) {
    return value ? value.toString() : null
  },
  getValidationMessage(value) {
    try {
      parseFunction(value)

      return ''
    } catch (e) {
      return `value "${value}" is Not a valid function ${e}`
    }
  },
  isTargetType(value) {
    return value instanceof Function
  }
})
