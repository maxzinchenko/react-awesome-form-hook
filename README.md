# React Awesome Form Hook

This hook makes form usage much easier

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

## [Example of Usage](https://github.com/maxzinchenko/react-awesome-form-hook/blob/master/example/src/App.tsx)

## Example of Options (in types)
```ts
type OptionsValue = {
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

type OptionsValue = {
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

type Options = {
  firstName: CustomInputOptions,
  lastName: InputOptions
}
```
