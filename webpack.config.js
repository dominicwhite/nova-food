const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
        ],
        // resolve: {
        //     alias: {
        //         vue: 'vue/dist/vue.js'
        //     }
        // },
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
                        query: {
                            plugins: [
                                [require('babel-plugin-transform-imports'), {
                                    'vuetify': {
                                        transform: function(importName, matches){
                                            return 'vuetify/es5/components/' + importName.toUpperCase();
                                        },
                                        preventFullImport: true
                                    }
                                }]
                            ]
                        }
                    }
                }
            ]
        }
    };
};
