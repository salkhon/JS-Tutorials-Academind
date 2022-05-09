const path = require("path");
// const CleanPlugin = require("clean-webpack-plugin");

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
	module: {
		// tells webpack to do something with some files it's managing
		rules: [
			{
				test: /\.m?js$/, // with an ext of .mjs or js, should be handled by this rule
				exclude: /(node_modules|bower_components)/, // exclude node_module, and another package manager bower_components - becauese we don't want to change 3rd pary package code.
				use: {
					// action that should be taken.
					loader: "babel-loader", // babel loader should take action on .mjs or js
					options: {
						presets: ["@babel/preset-env"], // and it should use the babel presets.
					},
				},
			},
		],
	},
	devtool: "source-map", // some source map for debuggin even in production
	// plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
