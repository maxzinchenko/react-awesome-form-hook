// Type definitions for react-awesome-form-hook 0.0.2
// Project: https://github.com/maxzinchenko/react-awesome-form-hook
// Definitions by: Max Zinchenko <https://github.com/maxzinchenko>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { ChangeEvent, FormEvent, MouseEvent } from 'react';

declare namespace useForm {
  export interface ValidationOptions {
    required: boolean;
    pattern?: RegExp;
    validate?: {
      check: (value: string) => boolean;
      message: string;
    };
    min?: number;
    max?: number
  }

  export type ValidationOptionsObject<T> = {
    [K in keyof T]?: ValidationOptions
  }

  export type Values<T> = {
    [K in keyof T]?: T[K];
  }

  export type Error = string | null;

  export type HandleChange = (event: ChangeEvent<HTMLInputElement>) => void;

  export type HandleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => void | false;

  export type IsSubmitDisabled = () => boolean;

  export type GetValues<T> = () => Values<T>;

  export interface Result<State> {
    state: State;
    error: Error;
    handleChange: HandleChange;
    handleSubmit: HandleSubmit;
    isSubmitDisabled: IsSubmitDisabled;
    getValues: GetValues<State>
  }
}

declare function useForm<T>(
  initialState: T,
  callback: (values: useForm.Values<T>) => void,
  options: useForm.ValidationOptionsObject<T>,
  apiError?: string | null,
  loading?: boolean
): useForm.Result<T>

export = useForm;
