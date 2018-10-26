const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    return {
        devServer: {
            publicPath: "/",
            contentBase: './public',
            hot: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new webpack.DefinePlugin({
                __MAPBOX_KEY__: JSON.stringify(env.MAPBOX)
            })
        ],
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js'
            }
        }
    };
};
