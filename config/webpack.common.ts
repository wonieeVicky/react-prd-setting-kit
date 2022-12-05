import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const srcPath = path.resolve(__dirname, '../src/');
const tsPath = path.resolve(srcPath, 'ts/');

const common: Configuration = {
  name: 'react product setting kit',
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      Containers: path.resolve(tsPath, 'containers'),
      Components: path.resolve(tsPath, 'components'),
      Actions: path.resolve(tsPath, 'actions'),
      Constants: path.resolve(tsPath, 'constants'),
      Hoc: path.resolve(tsPath, 'hoc'),
      Pages: path.resolve(tsPath, 'pages'),
      Hooks: path.resolve(tsPath, 'hooks'),
      Styles: path.resolve(tsPath, 'styles'),
      Utils: path.resolve(tsPath, 'utils'),
      Translations: path.resolve(tsPath, 'translations'),
      Types: path.resolve(srcPath, 'types'),
      Img: path.resolve(srcPath, 'img'),
      Css: path.resolve(srcPath, 'css'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|woff|woff2|otf|eot|ttf|svg|gif|webp)(\?[a-z0-9=.]+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
        type: 'asset/resource',
        generator: {
          outputPath: 'src',
          filename: (pathData: { filename: string }) => {
            return pathData.filename;
          },
        },
      },
    ],
  },
  entry: {
    polyfill: ['core-js/stable', 'regenerator-runtime/runtime'],
    app: path.resolve(srcPath, 'ts/index.tsx'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
  ],
};

export default common;
