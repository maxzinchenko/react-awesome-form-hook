# React Awesome Form Hook

The hook makes form usage much easier

<a href="https://npmjs.com/package/react-awesome-form-hook" target="\_parent">
  <img alt="npm version" src="https://img.shields.io/npm/v/react-awesome-form-hook.svg" />
</a><a href="https://npmjs.com/package/react-awesome-form-hook" target="\_parent">
  <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-awesome-form-hook.svg" />
</a>

## Installation

```
# using npm
npm install react-awesome-form-hook

# using yarn
yarn add react-awesome-form-hook
```

## Example of Options
```ts
type CustomInputOptions = {
  // required
  required: {
    value: boolean
    message: string
  },
  // max length
  max: {
    value: number,
    message: string
  },
  // min length
  min: {
    value: number,
    message: string
  },
  // pattern
  pattern: {
    value: RegExp,
    message: string
  },
  // custom function
  validate: {
    value: (value: string) => boolean,
    message: string
  }
}

type InputOptions = {
  // required
  required: boolean,
  // max length
  max: number,
  // min length
  min: number,
  // pattern
  pattern: RegExp,
  // custom function
  validate: (value: string) => boolean
}

type ValidationOptions {
  firstName: CustomInputOptions,
  lastName: InputOptions
}
```

## Example of Usage

```js
import React from 'react';
import { useForm } from 'react-awesome-form-hook';


const firstNameOptions = {
  required: {
    value: true,
    message: 'is required'
  },
  max: {
    value: 10,
    message: 'too long'
  },
  min: {
    value: 5,
    message: 'too short'
  },
  pattern: {
    value: /[A-Za-z]{3}/,
    message: 'is invalid'
  },
  validate: {
    value: value => value !== 'react-awesome-form-hook',
    message: 'is invalid'
  }
};

const lastNameOptions = {
  required: true,
  max: 10,
  min: 5,
  pattern: /[A-Za-z]{3}/,
  validate: value => value !== 'react-awesome-form-hook'
};

const validationOptions = {
  firstName: firstNameOptions,
  lastName: lastNameOptions
};

const initialState = {
  firstName: { value: '', error: '' },
  lastName: { value: '', error: '' }
};

export const MyFormComponent = () => {
  const { state, disabled, getValues, handleChange } = useForm(initialState, validationOptions);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = getValues('value');

    console.log(data);
    // the log result  below
    // {
    //    firstName: string;
    //    lastName: string;
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={state.firstName.value}
        onChange={handleChange}
      />
      {state.firstName.error && <small>{state.firstName.error}</small>}
      <input
        name="lastName"
        value={state.lastName.value}
        onChange={handleChange}
      />
      {state.lastName.error && <small>{state.lastName.error}</small>}
      <button
        disabled={disabled}
        type="submit"
      >
        Submit
      </button>
    </Form>
  );
};
