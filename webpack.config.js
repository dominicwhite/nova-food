const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            new VueLoaderPlugin(),
            new VuetifyLoaderPlugin(),
            new CopyWebpackPlugin([
                {from:'public'}
            ]),
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.styl$/,
                    loader: 'style-loader!css-loader!stylus-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',

                    }
                }
            ]
        }
    };
};
