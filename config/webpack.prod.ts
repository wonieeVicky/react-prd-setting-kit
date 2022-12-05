import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import path from 'path';
import os from 'os';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// path
const buildPath = require('../../buildPath');
const { template } = require('./paths');

const config = merge<Configuration>(common, {
  mode: 'production',
  // devtool: 'hidden-source-map', // production에서는 map 파일 추출 안함
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      minify: false,
      inject: false,
      template,
      filename: `${path.resolve(__dirname, '../dist')}/spa-scripts.html`, // `${buildPath.templatesPath}/spa/spa-scripts.html`
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    hashDigestLength: 4,
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[chunkhash].chunk.min.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: path.resolve(__dirname, '../dist'),
    // assetModuleFilename: 'assets/[name][ext]', // [name][ext][hash][query][fragment][base][path][file]
  },
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
                debug: false,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: ['@loadable/babel-plugin'],
        },
        exclude: path.join(__dirname, '../node_modules'),
      },
      {
        test: /\.css?$/, // /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1, // CPU 멀티 프로세서 병렬화 옵션 (기본 값: true)
      }),
      new ImageMinimizerPlugin({
        exclude: /node_modules/,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          // 최적화 옵션
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

export default config;
