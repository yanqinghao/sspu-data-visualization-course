const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("./package.json");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const name = pkg.name;
const plugins = [
  new MiniCssExtractPlugin({
    filename: `${name}.css`,
  }),
];

module.exports = (env = {}) => {
  const isProd = env.production;
  const { analysis = false } = env;

  const config = {
    entry: ["./src/dashboard/index.js"],
    mode: isProd ? "production" : "development",
    devtool: !isProd && "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: () => `${name}.min.js`,
      library: name,
      libraryTarget: "umd",
    },
    resolve: {
      extensions: [".jsx", ".js", ".ts", ".tsx"],
    },
    optimization: {
      minimize: isProd,
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-syntax-jsx",
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
        {
          test: /\.(js|ts)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.txt$/,
          use: [
            {
              loader: "raw-loader",
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader",
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.tpl$/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader'
        }
      ],
    },
    plugins: plugins
  };

  if (isProd) {
    config.optimization.minimizer = [
      new TerserJSPlugin({
        terserOptions: {
          exclude: /\/node_modules/,
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ];
    config.plugins.push(new webpack.BannerPlugin(`${name} - ${pkg.version}`));
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({ template: "index.html", inject: "head" })
    );
  }

  if (analysis) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
