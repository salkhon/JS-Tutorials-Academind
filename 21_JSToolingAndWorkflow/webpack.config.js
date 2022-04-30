const path = require("path");

module.exports = {
    mode: "development", 
    entry: "./src/app.js", 
    output: {
        filename: "app.js", // this will be our bundled code
        path: path.resolve(__dirname, "assets", "scripts"), 
        publicPath: "./assets/scripts/" // where to look for dynamic imports
    }, 
    devServer: {
        contentBase: "./" // tells dev-server where your root html can be found. 
    }
}
