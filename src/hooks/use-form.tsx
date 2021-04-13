import React, { useState, useCallback, useMemo, memo, FormEvent, ChangeEvent, InputHTMLAttributes, FormHTMLAttributes } from 'react';

import { State, Options, StateValue } from '../types';
import { validateValue } from '../services/validation';

type Values<T> = Record<keyof T, string | null>;
type SubmitCallback<T> = (event: FormEvent<HTMLFormElement>, data: Values<T>) => void;

export const useForm = <S extends State>(initialState: S, options: Options<S>, submitCallback: SubmitCallback<S>) => {
  const [state, setState] = useState(initialState);

  const getValues = useCallback((target: S, key: keyof StateValue): Values<S> => {
    const values = {} as Values<S>;

    Object.keys(target).forEach((targetKey: keyof S) => {
      values[targetKey] = target[targetKey][key];
    });

    return values;
  }, []);

  const disabled = useMemo((): boolean => {
    const errors = getValues(state, 'error');

    return !!Object.values(errors).filter(error => !!error).length;
  }, [state]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    validateValue(options[name], value, error => {
      setState((prevState) => ({ ...prevState, [name]: { value, error } }));
    });
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    if (disabled) return;

    submitCallback(event, getValues(state, 'value'));
  }, [disabled]);

  const Input = memo<InputHTMLAttributes<{}>>(props => (
    <input { ...props } onChange={ props.onChange || handleChange }/>
  ));

  const Form = memo<FormHTMLAttributes<{}>>(({ children, ...props }) => (
    <form { ...props } onSubmit={ props.onSubmit || handleSubmit }>
      { children }
    </form>
  ));

  return {
    state,
    disabled,
    getValues,
    Input,
    Form
  };
};
