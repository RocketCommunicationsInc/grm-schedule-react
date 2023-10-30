const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');
const path = require('path');

module.exports = {
  entry: './src/entry',
  mode: 'development',
  devServer: {
    port: 3002,
  },
  output: {
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'GRMSchedule',
      filename: 'remoteEntry.js',
      exposes: {
        // which exposes
        './CreateContact':
          './src/components/ManageContacts/AddAndModifyPanel/AddContact.tsx',
      },
      shared: {
        // and shared
        ...dependencies, // some other dependencies
        react: {
          // react
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          // react-dom
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    preferRelative: true,
    alias: {
      providers: path.resolve(__dirname, './src/providers'),
      utils: path.resolve(__dirname, './src/utils'),
      hooks: path.resolve(__dirname, './src/hooks'),
      common: path.resolve(__dirname, './src/common'),
      data: path.resolve(__dirname, './src/data'),
      Types: path.resolve(__dirname, './src/Types'),
    },
  },
  target: 'web',
};
