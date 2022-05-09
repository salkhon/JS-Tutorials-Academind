const path = require("path");
// const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/app.js",
	output: {
		filename: "app.js", // this will be our bundled code
		path: path.resolve(__dirname, "assets", "scripts"),
		publicPath: "./assets/scripts/", // where to look for dynamic imports
	},
	devServer: {
		static: "./", // tells dev-server where your root html can be found.
	},
	devtool: "eval-cheap-source-map",
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
						presets: [
							["@babel/preset-env", { useBuiltIns: "usage" }],
						], // and it should use the babel presets.
					},
				},
			},
		],
	},
	// plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
