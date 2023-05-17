const path = require('path')
const webpack = require('webpack')

// module.exports = {
// //   mode: 'development',
//   entry: {
//     index: './src/entrypoints/index.js',
//     styles: './src/entrypoints/styles.js',
//     bootstrap: './src/entrypoints/bootstrap.js'
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist')
//   },
//   devServer: { open: true, host: 'localhost' },
//   plugins: [new webpack.HotModuleReplacementPlugin()],
//   module: {
//     rules: [
//       {
//         test: /\.s[ac]ss$/i,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//         include: [
//           path.resolve(__dirname, 'sass')
//         ]
//       },
//       {
//         test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
//         type: 'asset'
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           // Creates `style` nodes from JS strings
//           'style-loader',
//           // Translates CSS into CommonJS
//           'css-loader',
//           // Compiles Sass to CSS
//           'sass-loader'
//         ]
//       }
//     ]
//   }
// }

exports = {
    entry: './app/index.js',
    module: {
      rules: [
        { test: /\.svg$/, use: 'svg-inline-loader' },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        { test: /\.(js)$/, use: 'babel-loader' }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin()
    ]
  }