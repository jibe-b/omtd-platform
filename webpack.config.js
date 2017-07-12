var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');

// Webpack Config
var webpackConfig = {
    entry: {
        'main': './app/main.ts',
    },

    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, './dist'),
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            path.resolve(__dirname, './'),
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),

        new webpack.DefinePlugin({"process.env" : {
            PRODUCTION: JSON.stringify(true),
            API_ENDPOINT : JSON.stringify(process.env.API_ENDPOINT || "https://dev.openminted.eu"),
            WORKFLOW_API_ENDPOINT : JSON.stringify(process.env.WORKFLOW_API_ENDPOINT || "https://dev.openminted.eu:8881"),
            API_PORT : JSON.stringify(process.env.API_PORT || "8080"),
            API_PATH : JSON.stringify("/omtd-registry"),
            CONNECTOR_PORT : JSON.stringify("8888"),
            OIDC_ENDPOINT : JSON.stringify(process.env.OIDC_ENDPOINT || "https://dev.openminted.eu:8080/omtd-registry/openid_connect_login"),
            AAI_ENDPOINT : JSON.stringify(process.env.AAI_ENDPOINT || "https://aai.openminted.eu/oidc")
        }})
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ]
            },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
            { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'source-map',

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ path.resolve(__dirname, 'node_modules') ]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
