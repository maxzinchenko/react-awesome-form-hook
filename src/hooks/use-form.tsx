import { useState, useCallback, useMemo, ChangeEvent } from 'react';

import { State, Options, StateValue } from '../types';
import { validateValue } from '../services/validation';

type Values<T> = Record<keyof T, string | null>;

export const useForm = <S extends State>(initialState: S, validationOptions: Options<S>) => {
  const [state, setState] = useState(initialState);

  const disabled = useMemo((): boolean => {
    const errors = getValues(state, 'error');

    return !!Object.values(errors).filter(error => !!error).length;
  }, [state]);

  const getValues = useCallback((target: S, key: keyof StateValue): Values<S> => {
    const values = {} as Values<S>;

    Object.keys(target).forEach((targetKey: keyof S) => {
      values[targetKey] = target[targetKey][key];
    });

    return values;
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    validateValue(validationOptions[name], value, error => {
      setState((prevState) => ({ ...prevState, [name]: { value, error } }));
    });
  }, []);

  return {
    state,
    disabled,
    getValues,
    handleChange
  };
};
