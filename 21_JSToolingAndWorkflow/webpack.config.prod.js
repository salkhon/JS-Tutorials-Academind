const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/app.js",
	output: {
		filename: "[contenthash].js",
		path: path.resolve(__dirname, "assets", "scripts"),
		publicPath: "./assets/scripts/",
	},
	devServer: {
		static: "./",
	},
	devtool: "source-map", // some source map fo rdebuggin even in production
	plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
