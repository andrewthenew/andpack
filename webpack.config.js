const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getEnv } = require('./env-config');

const procEnv = getEnv();
process.env.NODE_ENV = procEnv;
const ENV = require('dotenv').config({
  path: path.join(__dirname, `env-config/${procEnv}.env`),
});

function getEnvVars() {
  const obj = {};
  Object.keys(ENV.parsed).filter(Boolean).forEach(k => {
    obj[k] = JSON.stringify(process.env[k]);
  });
  return obj;
}

console.log('------------------------------------');
console.log(`    Environment: ${procEnv}`);
console.log('------------------------------------ \n\n');


module.exports = {

  entry: [
    './src/index.js',
  ],

  mode: process.env.NODE_ENV,

  output: {
    // path: path.resolve(__dirname, 'public/build'),
    // filename: '[name].js',

    path: path.join(__dirname, './dist'),
    filename: 'andpack.js',
    library: 'andpack',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': getEnvVars(),
      'process.env.BROWSER': true,
    }),
    new MiniCssExtractPlugin(),
  ],

  optimization: {
    splitChunks: {
      chunks: 'async',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `part.${packageName.replace('@', '')}`;
          },
          chunks: 'async'
        },
      },
    },
    minimize: true,
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   use: ['source-map-loader'],
      // },
      // {
      //   test: /\.tsx?|.jsx?$/,
      //   use: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(pdf|doc|zip)$/,
        use: ['file-loader'],
      },
      // {
      //   test: /\.s?css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              name: '[name][md5:hash].[ext]',
              outputPath: 'assets/',
              publicPath: '/assets/'
            }
          }
        ]
      },
    ],
  },

  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'assets': path.resolve(__dirname, 'assets'),
    }
  },

  externals: {
    fs: 'es2015 fs',
    path: 'es2015 path',

    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  },

};
