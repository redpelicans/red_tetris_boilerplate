const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CLIENT_DIR = "src/client";

module.exports = () => {
  const isEnvProduction = process.env.NODE_ENV === "production";

  return {
    mode: isEnvProduction ? "production" : "development",

    entry: path.join(__dirname, CLIENT_DIR, "index.js"),

    output: {
      path: path.join(__dirname, "build"),
      filename: "bundle.js",
      publicPath: "/",
    },

    devServer: {
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, CLIENT_DIR),
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, "public"),
          use: "html-loader",
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, CLIENT_DIR),
          use: [
            MiniCssExtractPlugin.loader,
            "cache-loader",
            "css-loader",
            "sass-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          include: path.resolve(__dirname, CLIENT_DIR, "assets/img"),
          use: ["cache-loader", "file-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          include: path.resolve(__dirname, CLIENT_DIR, "assets/fonts"),
          use: ["cache-loader", "file-loader"],
        },
      ],
    },

    resolve: {
      symlinks: false,
      alias: {
        actions: path.resolve(__dirname, CLIENT_DIR, "actions"),
        components: path.resolve(__dirname, CLIENT_DIR, "components"),
        hooks: path.resolve(__dirname, CLIENT_DIR, "hooks"),
        pages: path.resolve(__dirname, CLIENT_DIR, "pages"),
        reducers: path.resolve(__dirname, CLIENT_DIR, "reducers"),
        store: path.resolve(__dirname, CLIENT_DIR, "store"),
      },
      extensions: ["*", ".js", ".jsx", ".scss"],
    },

    plugins: [
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
