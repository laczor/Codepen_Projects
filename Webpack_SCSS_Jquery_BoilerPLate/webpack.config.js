var path = require('path');                                     //to determine absolute path
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //will create external css files
var HtmlWebpackPlugin = require('html-webpack-plugin');         //will create a new html 
var CleanWebpackPlugin = require('clean-webpack-plugin');       //will cleare the dist folder everytime

var webpack = require('webpack');
//Create a new instance to set the name of the create css files,
var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});


// installing the custom-scroll-jQuery plugin
// https://www.npmjs.com/package/malihu-custom-scrollbar-plugin

module.exports = {
    entry: './src/js/app.js',       //where the journey begins
    output: {
        path: path.resolve(__dirname, 'dist'),  //everything will be created in the dist/ folder
        filename: 'bundle.js',
        // publicPath: '/dist'      //since index.html is with the other files, no need to specify public Path for webpack-dev-server   
    },
    module: {
        rules: [
//load es6 scripts with babel
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
//Extracting the loaded scss modules createin a main.css file from it (which will be injected into the created HTML files)
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
//usage of the file-loader, for copying images into the img/folder with the same name
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            },
//This is for copy, and recreate the imported html files in the entry file            
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }

                    }
                ],
             //We do not want to copy over base index.html   
                exclude: path.resolve(__dirname,"src/index.html")
            },
//jquery plugin s imported this way   
// https://www.npmjs.com/package/malihu-custom-scrollbar-plugin
            { test: /jquery-mousewheel/, loader: "imports-loader?define=>false&this=>window" },
            { test: /malihu-custom-scrollbar-plugin/, loader: "imports-loader?define=>false&this=>window" }
        ]
    },
    plugins: [
//We map the imported js files together    
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        }),
        extractPlugin,
//This will just recreate html files, inserting the available css + js files, taking into consideration the index.html    
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
//Will clear the created dist folder
        new CleanWebpackPlugin(['dist'])
    ]
};