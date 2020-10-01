const isObject = value => typeof value === 'object';

export const validateValue = (options, value, callback) => {
  const { required, pattern, validate, minLength, maxLength } = options;

  if (required && !value) {
    if (isObject(required)) {
      return callback(required.message);
    }

    return callback('blank');
  }

  if (pattern) {
    if (isObject(pattern)) {
      if (!pattern.value.test(value)) {
        return callback(pattern.message);
      }
    }

    return !pattern.test(value) && callback('invalid');
  }

  if (validate && !validate.check(value)) {
    return callback(validate.message);
  }

  if (minLength) {
    if (isObject(minLength)) {
      if (value.length < minLength.value) {
        return callback(minLength.message);
      }
    }

    return value.length < minLength && callback(`cannot be shorter than ${ minLength } characters`);
  }

  if (maxLength) {
    if (isObject(maxLength)) {
      if (value.length > maxLength.value) {
        return callback(maxLength.message);
      }
    }

    return value.length > maxLength && callback(`cannot be longer than ${ maxLength } characters`);
  }

  return callback(null);
};
