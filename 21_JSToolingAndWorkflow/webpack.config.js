const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "development", 
    entry: "./src/app.js", 
    output: {
        filename: "app.js", // this will be our bundled code
        path: path.resolve(__dirname, "assets", "scripts"), 
        publicPath: "./assets/scripts/" // where to look for dynamic imports
    }, 
    devServer: {
        static: "./" // tells dev-server where your root html can be found. 
    }, 
    devtool: "eval-cheap-source-map", 
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
}
