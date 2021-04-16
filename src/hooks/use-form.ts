import React from 'react';

import { State, Options, StateValue } from '../types';
import { validateValue } from '../services/validation';

type Values<T> = Record<keyof T, string | null>;

export const useForm = <S extends State>(initialState: S, validationOptions: Options<S>) => {
  const [state, setState] = React.useState(initialState);

  const getValues = React.useCallback((target: S, key: keyof StateValue): Values<S> => {
    const values = {} as Values<S>;

    Object.keys(target).forEach((targetKey: keyof S) => {
      values[targetKey] = target[targetKey][key];
    });

    return values;
  }, []);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    validateValue(validationOptions[name], value, error => {
      setState((prevState) => ({ ...prevState, [name]: { value, error } }));
    });
  }, []);

  const disabled = React.useMemo((): boolean => {
    const errors = getValues(state, 'error');

    return !!Object.values(errors).filter(error => !!error).length;
  }, [state]);

  return {
    state,
    disabled,
    getValues,
    handleChange
  };
};
