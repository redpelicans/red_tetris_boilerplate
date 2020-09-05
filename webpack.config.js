const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  const isEnvProduction = process.env.NODE_ENV === "production";

  return {
    mode: isEnvProduction ? "production" : "development",

    entry: path.join(__dirname, "src/client/index.js"),

    output: {
      path: path.join(__dirname, "build"),
      filename: "bundle.js",
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "src/client"),
          use: ["cache-loader", "babel-loader"],
        },
        {
          test: /\.html$/,
          use: "html-loader",
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, "src/client"),
          use: [
            "cache-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["cache-loader", "file-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["cache-loader", "file-loader"],
        },
      ],
    },

    resolve: {
      symlinks: false,
      alias: {
        actions: path.resolve(__dirname, "src/client/actions"),
        components: path.resolve(__dirname, "src/client/components"),
        hooks: path.resolve(__dirname, "src/client/hooks"),
        pages: path.resolve(__dirname, "src/client/pages"),
        reducers: path.resolve(__dirname, "src/client/reducers"),
      },
      extensions: ["*", ".js", ".jsx", ".scss"],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isEnvProduction ? "[name].css" : "styles.css",
        chunkFilename: isEnvProduction ? "[id].css" : "styles.css",
      }),
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html",
      }),
    ],
  };
};
