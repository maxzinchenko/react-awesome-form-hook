export type Option<T> = T | {
  value: T;
  message: string;
};

export type ValidateFunction = (value: string) => boolean;

export type Required = Option<boolean>;
export type Max = Option<number>;
export type Min = Option<number>;
export type Pattern = Option<RegExp>;
export type Validate = Option<ValidateFunction>;

export type AnyOption = Required | Max | Min | Pattern | Validate;

export type OptionValue = {
  required?: Required;
  max?: Max;
  min?: Min;
  pattern?: Pattern;
  validate?: Validate;
};

export type Options<T> = Record<keyof T, OptionValue>;

export type StateValue = {
  value: string;
  error: null | string;
};

export type State = Record<string, StateValue>;
