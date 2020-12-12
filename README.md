# React Awesome Form Hook

The hook makes form usage much easier

## Installation

```
# using npm
npm install react-awesome-form-hook

# using yarn
yarn add react-awesome-form-hook
```

## Example Usage

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
  const formData = useForm(initialState, validationOptions, (event, data) => handleSubmitForm(event, data));
  const { state, handleChange, handleSubmit, isSubmitDisabled } = formData;  

  const handleSubmitForm = (event, data) => {
    event.preventDefault();

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={state.firstName.value}
        onChange={handleChange}
      />
      {state.firstName.error && <small>{ state.firstName.error }</small>}
      <input
        name="lastName"
        value={state.lastName.value}
        onChange={handleChange}
      />
      {state.lastName.error && <small>{ state.lastName.error }</small>}
      <button onClick={handleSubmit} disabled={isSubmitDisabled()}>
        submit
      </button>
    </form>
  );
};
