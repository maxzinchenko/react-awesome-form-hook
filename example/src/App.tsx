import React, { FormEvent } from 'react';
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
    value: /[A-Za-z]/,
    message: 'is invalid'
  },
  validate: {
    value: (value: string) => value !== 'react-awesome-form-hook',
    message: 'is invalid'
  }
};

const lastNameOptions = {
  required: true,
  max: 10,
  min: 5,
  pattern: /[A-Za-z]/,
  validate: (value: string) => value !== 'react-awesome-form-hook'
};

const validationOptions = {
  firstName: firstNameOptions,
  lastName: lastNameOptions
};

const initialState = {
  firstName: { value: '', error: '' },
  lastName: { value: '', error: '' }
};

function App() {
  const { state, disabled, handleChange, getValues } = useForm(initialState, validationOptions);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(getValues(state, 'value'));
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
    </form>
  );
}

export default App;
