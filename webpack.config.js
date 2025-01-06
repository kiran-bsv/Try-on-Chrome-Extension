const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    background: './background/background.js',
    content: './content/content.js',
    popup: './popup/popup.js',
  },
  output: {
    filename: '[name].bundle.js',  // Will generate background.bundle.js, content.bundle.js, popup.bundle.js
    path: path.resolve(__dirname, 'dist'),  // All the bundled files will be placed in 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // Handling CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,  // Transpiling JS with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // Supports latest JavaScript syntax
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],  // Resolves these file extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './popup/popup.html',  // Create bundled popup.html
      filename: 'popup.html',  // Output it in 'dist' folder
    }),
  ],
  mode: 'production',  // Change to 'production' for production build
};
