const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const baseConfig = {
    entry: './src/app.tsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            // transpileOnly: true, // 型チェックしない
            configFile: 'tsconfig.json',
          },
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  };

  return argv.mode === 'development'
    ? {
        ...baseConfig,
        devServer: {
          contentBase: path.join(__dirname, 'dist/'),
          hot: true,
          port: 9000,
        },
      }
    : baseConfig;
};
