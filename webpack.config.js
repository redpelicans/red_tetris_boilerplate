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
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            "postcss-loader",
          ],
        },
      ],
    },

    resolve: {
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
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html",
      }),
    ],
  };
};
