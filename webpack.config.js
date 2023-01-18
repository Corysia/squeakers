const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
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
    module: {
        rules: [
            {
                test: /\.tsx?$/, //regex to match .ts and .tsx files
                use: "ts-loader", //tells webpack to use ts-loader to compile .ts files
                exclude: /node_modules/, //tells webpack to ignore node_modules
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                type: 'asset/resource',
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, //injects the js file into the html file
            template: path.resolve(appDirectory, "src/index.html"), //path to the html file
        }),        
        new CopyPlugin({
            patterns: [
                { from: "resources", noErrorOnMissing: true },
            ],
        }),
    ],
    mode: "production", //tells webpack to run in production mode
};