import babel from 'rollup-plugin-babel';
import size from 'rollup-plugin-size';
import externalDeps from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const external = ['react'];

const commonOutput = {
  name: 'ReactAwesomeFormHook',
  format: 'umd',
  sourcemap: true,
  globals: {
    react: 'React'
  }
};

const commonPlugins = [
  babel(),
  externalDeps()
];

export default [{
  input: 'src/index.js',
  output: {
    ...commonOutput,
    file: 'dist/react-awesome-form-hook.development.js'
  },
  external,
  plugins: [
    ...commonPlugins,
    replace({ 'process.env.NODE_ENV': 'development', delimiters: ['', ''] })
  ]
}, {
  input: 'src/index.js',
  output: {
    commonOutput,
    file: 'dist/react-awesome-form-hook.production.min.js'
  },
  external,
  plugins: [
    ...commonPlugins,
    replace({ 'process.env.NODE_ENV': 'production', delimiters: ['', ''] }),
    terser(),
    size({ writeFile: false })
  ]
}];
