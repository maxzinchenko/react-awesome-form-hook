if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-awesome-form-hook.production.min.js');
} else {
  module.exports = require('./dist/react-awesome-form-hook.development.js');
}
