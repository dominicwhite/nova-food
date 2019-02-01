const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    let apiSetup = (env => {
        if (env.prod) return 'https://novafoodapi.hyperninja.net';
        else return 'http://127.0.0.1:5000';
    })(env);
    console.log(`Backend API is: ${apiSetup}`);
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
            new webpack.DefinePlugin({'process.env.apiEndpoint': JSON.stringify(apiSetup)}),
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
