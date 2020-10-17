import { useState, useEffect, useCallback } from 'react';

import { validateValue } from '../services/validation';

export const useForm = (
  initialState,
  submitCallback,
  validationOptions,
  apiError,
  loading
) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    (!loading && !!apiError) && setError(() => error);
  }, [loading]);

  const changeState = (name, value, valueError) => {
    !!error && setError(() => '');
    setState((prevState) => ({ ...prevState, [name]: { value, error: valueError } }));
  };

  const handleChange = useCallback(event => {
    const { name, value } = event.currentTarget;

    validateValue(validationOptions[name], value, validationError => {
      changeState(name, value, validationError ? `${ name } ${ validationError }` : '');
    });
  }, [setState, setError]);

  const getValues = (path = 'value') => {
    const values = {};

    Object.keys(state).forEach(key => {
      values[key] = state[key][path];
    });

    return values;
  };

  const isSubmitDisabled = () => {
    const errors = getValues('error');

    return !!Object.keys(errors).length;
  };

  const handleSubmit = () => !isSubmitDisabled() && submitCallback(getValues());

  return {
    state,
    error,
    handleChange,
    handleSubmit,
    isSubmitDisabled,
    getValues
  };
};
