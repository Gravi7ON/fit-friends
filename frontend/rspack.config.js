const { composePlugins, withNx, withWeb } = require('@nx/rspack');

module.exports = composePlugins(withNx(), withWeb(), (config) => {
  config.devServer.open = true;
  return config;
});
