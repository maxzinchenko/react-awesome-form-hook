const isObject = value => typeof value === 'object';
const isRegExp = value => value instanceof RegExp;

export const validateValue = (options, value, callback) => {
  const { required, pattern, validate, min, max } = options;

  if (required && !value) {
    if (isObject(required)) {
      return callback(required.message);
    }

    return callback('blank');
  }

  if (pattern) {
    if (isObject(pattern) && !isRegExp(pattern)) {
      if (!pattern.value.test(value)) {
        return callback(pattern.message);
      }
    }

    if (isRegExp(pattern) && !pattern.test(value)) {
      return callback('invalid');
    }
  }

  if (validate) {
    if (isObject(validate)) {
      if (!validate.value(value)) {
        return callback(validate.message);
      }
    } else {
      if (!validate(value)) {
        return callback('invalid');
      }
    }
  }

  if (min) {
    if (isObject(min)) {
      if (value.length < min.value) {
        return callback(min.message);
      }
    }

    if (value.length < min) {
      return callback('too short');
    }
  }

  if (max) {
    if (isObject(max)) {
      if (value.length > max.value) {
        return callback(max.message);
      }
    }

    if (value.length > max) {
      return callback('too long');
    }
  }

  if (!value.trim()) {
    return callback('invalid');
  }

  return callback('');
};
