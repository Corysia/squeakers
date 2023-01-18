const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, "src/main.ts"), //path to the main .ts file
    output: {
        filename: "js/bundleName.js", //name for the js file that is created/compiled in memory
        clean: true, //cleans the dist folder before each build
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"], //extensions that webpack will look for
    },
    devServer: {
        host: "0.0.0.0", //allows us to access the server from other devices on the network
        port: 8080, //port that we're using for local host (localhost:8080)
        static: path.resolve(appDirectory, "resources"), //tells webpack to serve from the public folder
        hot: true, //allows us to update the page without refreshing
        devMiddleware: {
            publicPath: "/", //tells webpack to serve from the root directory
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, //regex to match .ts and .tsx files
                use: "ts-loader", //tells webpack to use ts-loader to compile .ts files
                exclude: /node_modules/, //tells webpack to ignore node_modules
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, //injects the js file into the html file
            template: path.resolve(appDirectory, "src/index.html"), //path to the html file
        })
    ],
    mode: "development", //tells webpack to run in development mode
};