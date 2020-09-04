const path = require('path');
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
  };

  return argv.mode === 'development'
    ? {
        ...baseConfig,
        devServer: {
          contentBase: path.join(__dirname, 'dist/'),
          hot: true,
        },
      }
    : baseConfig;
};
