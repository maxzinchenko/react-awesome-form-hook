import { useState, useCallback } from 'react';

import { validateValue } from '../services/validation';

export const useForm = (initialState, submitCallback, validationOptions) => {
  const [state, setState] = useState(initialState);

  const changeState = (name, value, error) => {
    setState((prevState) => ({ ...prevState, [name]: { value, error } }));
  };

  const handleChange = useCallback(event => {
    const { name, value } = event.currentTarget;

    return validateValue(validationOptions[name], value, error => {
      changeState(name, value, error);
    });
  }, [setState]);

  const getValues = (path = 'value') => {
    const values = {};

    Object.keys(state).forEach(key => {
      values[key] = state[key][path];
    });

    return values;
  };

  const isSubmitDisabled = () => {
    const errors = getValues('error');
    const values = getValues('value');

    const isEmpty = !!Object.values(values).filter(value => !value).length;
    const hasError = !!Object.values(errors).filter(error => !!error).length;

    return isEmpty || hasError;
  };

  const handleSubmit = event => !isSubmitDisabled() && submitCallback(event, getValues());

  return {
    state,
    handleChange,
    handleSubmit,
    isSubmitDisabled,
    getValues
  };
};
