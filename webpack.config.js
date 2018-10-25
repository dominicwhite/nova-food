const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        publicPath: "/",
        contentBase: './public',
        hot: true
    }
};
