const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");

const CLIENT_DIR = path.join(__dirname, "src/client");

module.exports = () => {
  const isEnvProduction = process.env.NODE_ENV === "production";

  return {
    mode: isEnvProduction ? "production" : "development",

    entry: path.join(CLIENT_DIR, "index.js"),

    output: {
      path: path.join(__dirname, "build"),
      filename: "bundle.js",
      publicPath: "/",
    },

    devtool: "cheap-module-source-map",

    devServer: {
      historyApiFallback: true,
      stats: "minimal",
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(CLIENT_DIR),
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve("eslint-friendly-formatter"),
                eslintPath: require.resolve("eslint"),
                configFile: ".eslintrc",
                resolvePluginsRelativeTo: __dirname,
              },
              loader: require.resolve("eslint-loader"),
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(CLIENT_DIR),
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, "public"),
          use: require.resolve("html-loader"),
        },
        {
          test: /\.scss$/,
          include: path.resolve(CLIENT_DIR),
          use: [
            MiniCssExtractPlugin.loader,
            require.resolve("cache-loader"),
            require.resolve("css-loader"),
            require.resolve("postcss-loader"),
            require.resolve("sass-loader"),
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          include: path.resolve(CLIENT_DIR, "assets/img"),
          use: require.resolve("file-loader"),
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          include: path.resolve(CLIENT_DIR, "assets/fonts"),
          use: require.resolve("file-loader"),
        },
      ],
    },

    resolve: {
      symlinks: false,
      alias: {
        actions: path.resolve(CLIENT_DIR, "actions"),
        components: path.resolve(CLIENT_DIR, "components"),
        helpers: path.resolve(CLIENT_DIR, "helpers"),
        hooks: path.resolve(CLIENT_DIR, "hooks"),
        pages: path.resolve(CLIENT_DIR, "pages"),
        reducers: path.resolve(CLIENT_DIR, "reducers"),
        store: path.resolve(CLIENT_DIR, "store"),
      },
      extensions: ["*", ".js", ".jsx", ".scss"],
    },

    plugins: [
      new CleanTerminalPlugin(),
      new ErrorOverlayPlugin(),
      new MiniCssExtractPlugin({
        filename: isEnvProduction ? "[name].css" : "styles.css",
        chunkFilename: isEnvProduction ? "[id].css" : "styles.css",
      }),

      // Generates an `index.html` file with the <script> injected.
      new HtmlWebPackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: path.resolve(__dirname, "public/index.html"),
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined,
        ),
      ),
    ],
  };
};
