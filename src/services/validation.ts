import { OptionValue } from '../types';

type Callback = (error: null | string) => void;

export const validateValue = (option: OptionValue, value: string, callback: Callback): void => {
  const { required, min, max, pattern, validate } = option;

  if (required && !value) {
    if (typeof required === 'object') {
      callback(required.message);
      return;
    }

    callback('blank');
    return;
  }

  if (max) {
    if (typeof max === 'object' && value.length > max.value) {
      callback(max.message);
      return;
    }

    if (value.length > max) {
      callback('too long');
      return;
    }
  }

  if (min) {
    if (typeof min === 'object' && value.length < min.value) {
      callback(min.message);
      return;
    }

    if (value.length < min) {
      callback('too short');
      return;
    }
  }

  if (pattern) {
    if (!(pattern instanceof RegExp) && !pattern.value.test(value)) {
      callback(pattern.message);
      return;
    }

    if (pattern instanceof RegExp && !pattern.test(value)) {
      callback('invalid');
      return;
    }
  }

  if (validate) {
    if (typeof validate === 'object' && validate.value(value)) {
      callback(validate.message);
      return;
    }

    if (typeof validate === 'function' && validate(value)) {
      callback('invalid');
      return;
    }
  }

  callback(null);
};
