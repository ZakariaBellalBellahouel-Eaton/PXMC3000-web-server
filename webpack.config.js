const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'SmpWebServer.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    sqlite3: 'sqlite3',
  },
  target: 'node',
};
