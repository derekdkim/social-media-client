const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192'
      }
    ]
  }
}