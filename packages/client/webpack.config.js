/* eslint-disable */
const path = require('path');
const HTMLlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const isProd = mode === 'production';

const getOptimizationConfig = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new TerserPlugin(), new OptimizeCssAssetsPlugin()];
  }

  return config;
};

const getFileName = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const getStyleLoader = (extra) => {
  const config = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]__[hash:base64:5]',
        },
        sourceMap: isDev,
      },
    },
  ];

  if (extra) config.push(extra);

  return config;
};

const getPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new HTMLlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
    }),
  ];

  // if (isProd) {
  //   plugins.push(new BundleAnalyzerPlugin());
  // }

  return plugins;
};

const config = {
  context: path.resolve(__dirname, 'src'),
  mode,
  entry: { main: ['@babel/polyfill', './index.tsx'] },
  output: {
    publicPath: '/',
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@root': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@store': path.resolve(__dirname, './src/store'),
      '@colors': path.resolve(__dirname, './src/assets/styles/colors.scss'),
    },
  },
  plugins: getPlugins(),

  optimization: getOptimizationConfig(),
  devServer: {
    port: 5100,
    hot: isDev,
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: getStyleLoader('sass-loader'),
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|oet)$/,
        use: ['file-loader'],
      },
    ],
  },
};

module.exports = config;
