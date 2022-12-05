import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import path from 'path';
import common from './webpack.common';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { template } = require('./paths');
const rootPath = path.resolve(__dirname, '../');

const config = merge<Configuration>(common, {
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 versions', 'ie >= 10'] },
                debug: true,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [require.resolve('react-refresh/babel'), require.resolve('@babel/plugin-proposal-class-properties')],
        },
        exclude: path.join(__dirname, '../node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].chunk.min.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false, // 압축 여부
      inject: false, // 자동 주입 여부
      template, // 템플릿 설정
      filename: './index.html',
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          content: 'upgrade-insecure-requests',
        },
      },
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 9000,
    static: { directory: path.resolve(rootPath) },
  },
});

export default config;
