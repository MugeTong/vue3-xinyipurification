const floatRegexp = '[-+]?[0-9]*.?[0-9]+'

// define the types of input size text
const types = [
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}px$`)
  },
  {
    name: '%',
    regexp: new RegExp(`^${floatRegexp}%$`)
  },
  // Fallback option: If no suffix specified, assigning "px"
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}$`)
  }
]

const getType = (value) => {
  if (value === 'auto') {
    return {
      type: value,
      value: 0
    }
  }

  for (let i = 0; i < types.length; i++) {
    let type = types[i]
    if (type.regexp.test(value)) {
      return {
        type: type.name,
        value: parseFloat(value)
      }
    }
  }

  return {
    type: '',
    value: value
  }
}

export const parse = (value) => {
  switch (typeof value) {
    case 'number':  // If the value is a number, assign "px" as the default suffix
      return {type: 'px', value}
    case 'string':  // If the value is a string, parse the value and assign the suffix
      return getType(value)
    default:
      return {type: '', value}
  }
}

export default parse